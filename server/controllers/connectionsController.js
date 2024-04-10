const { Connection } = require("pg");
const { Connections, User, Profile } = require("../db/models");

exports.connectionsGet = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["login", "id"],
    });

    const profileMap = new Map();
    const profiles = await Profile.findAll();
    profiles.forEach((profile) => {
      profileMap.set(profile.user_id, {
        info: profile.info,
        country: profile.country,
        language: profile.language,
      });
    });

    const connections = await Connections.findAll();
    if (connections) {
      const resArr = connections.map((el) => {
        const student = users.find((user) => user.id === el.student_id);
        const investor = users.find((user) => user.id === el.investor_id);

        return {
          id: el.id,
          investor: investor.login,
          investorId: el.investor_id,
          student: student.login,
          studentId: el.student_id,
          status: el.status,
          studentInfo: profileMap.get(el.student_id)?.info,
          investorInfo: profileMap.get(el.investor_id)?.info,
          studentCountry: profileMap.get(el.student_id)?.country,
          investorCountry: profileMap.get(el.investor_id)?.country,
          studentLanguage: profileMap.get(el.student_id)?.language,
          investorLanguage: profileMap.get(el.investor_id)?.language,
        };
      });
      res.json(resArr);
    }
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.connectionsUpdate = async (req, res) => {
  try {
    const connection = await Connections.findOne({
      where: {
        student_id: req.session.user.id,
        investor_id: req.body.investor_id,
      },
    });

    if (!connection) {
      const newConnection = await Connections.create({
        student_id: req.session.user.id,
        investor_id: req.body.investor_id,
        status: req.body.status,
      });

      const [student, investor] = await Promise.all([
        User.findOne({ where: { id: newConnection.student_id } }),
        User.findOne({ where: { id: newConnection.investor_id } }),
      ]);

      res.json({
        id: newConnection.id,
        investor: investor.login,
        student: student.login,
        status: newConnection.status,
      });
    } else {
      res.json({ err: "Connection is already created!" });
    }
  } catch (error) {
    console.error("Error updating connection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.connectionsStatusUpdate = async (req, res) => {
  try {
    const connection = await Connections.findOne({
      where: {
        student_id: req.body.student_id,
        investor_id: req.body.investor_id,
      },
    });

    if (connection) {
      connection.status = req.body.status;
      await connection.save();
      res.end();
    } else {
      res.status(404).json({ error: "Connection not found" });
    }
  } catch (error) {
    console.error("Error updating connection status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

