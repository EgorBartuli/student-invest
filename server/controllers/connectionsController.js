const { Connection } = require("pg");
const { Connections, User, Profile, Sequelize } = require("../db/models");

exports.connectionsGet = async (req, res) => {
  const users = await User.findAll({
    attributes: ["login", "id"],
  });
  const profile = await Profile.findAll();
  console.log(users);

  const connections = await Connections.findAll();
  console.log(connections);
  if (connections) {
    const resArr = connections.map((el) => {
      let studentLogin;
      let studentId;
      let investorLogin;
      let investorId;
      let studentInfo;
      let investorInfo;
      let studentCountry;
      let investorCountry;
      let studentLanguage;
      let investorLanguage;
      //Search for Student
      for (let i of users) {
        if (i.dataValues.id === el.dataValues.student_id) {
          studentLogin = i.dataValues.login;
          studentId = el.dataValues.student_id;
          for (let y of profile) {
            if (i.dataValues.id === y.dataValues.user_id) {
              studentInfo = y.dataValues.info;
              studentCountry = y.dataValues.country;
              studentLanguage = y.dataValues.language;
            }
          }
        }
        if (i.dataValues.id === el.dataValues.investor_id) {
          investorLogin = i.dataValues.login;
          investorId = el.dataValues.investor_id;
          for (let y of profile) {
            if (i.dataValues.id === y.dataValues.user_id) {
              investorInfo = y.dataValues.info;
              investorCountry = y.dataValues.country;
              investorLanguage = y.dataValues.language;
            }
          }
        }
      }

      return {
        id: el.dataValues.id,
        investor: investorLogin,
        investorId,
        student: studentLogin,
        studentId,
        status: el.dataValues.status,
        studentInfo,
        investorInfo,
        studentCountry,
        investorCountry,
        studentLanguage,
        investorLanguage,
      };
    });
    console.log("32 Line", resArr);
    res.json(resArr);
  }
};

exports.connectionsUpdate = async (req, res) => {
  const connection = await Connections.findOne({
    where: {
      student_id: req.session.user.id,
      investor_id: req.body.investor_id,
    },
  });
  if (connection === null) {
    const newConnection = new Connections({
      student_id: req.session.user.id,
      investor_id: req.body.investor_id,
      status: req.body.status,
    });
    await newConnection.save();

    //Search for Users
    const student = await User.findOne({
      where: { id: newConnection.student_id },
    });
    const investor = await User.findOne({
      where: { id: newConnection.investor_id },
    });

    res.json({
      id: newConnection.id,
      investor: investor.login,
      student: student.login,
      status: newConnection.status,
    });
  } else {
    res.json({ err: "Connection is already created!" });
  }
};

exports.connectionsStatusUpdate = async (req, res) => {
  let connection = await Connections.findOne({
    where: { student_id: req.body.student_id, investor_id: req.body.investor_id },
  });

  connection.status = req.body.status;
  await connection.save();
  res.end();
};
