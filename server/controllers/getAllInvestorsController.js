const { User, Profile } = require("../db/models");

exports.getAllInvestors = async (req, res) => {
  try {
    const usersWithProfiles = await User.findAll({
      attributes: ["id"],
      where: { status: ["Investor", "University"] },
      include: Profile, // Join User with Profile
    });

    const investors = usersWithProfiles.map((user) => user.Profile);
    res.json(investors);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

