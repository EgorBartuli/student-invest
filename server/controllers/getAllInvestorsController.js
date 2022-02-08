const { User } = require("../db/models");
const { Profile } = require("../db/models");

exports.getAllInvestors = async (req, res) => {
  const user = await User.findAll({
    attributes: ["id"],
    where: { status: ["Investor", "University"] },
  });
  console.log("user", user);
  const profile = await Profile.findAll();
  if (profile === null) {
    res.json(null);
  } else {
    let resArr = user.map((el) => {
      for(let i of profile){
        console.log("el", el.dataValues.id);
        console.log("i", i.dataValues.id);
        if(el.dataValues.id === i.dataValues.user_id) {
          console.log("IF");
          return i.dataValues
        }
      }
    });
    resArr = resArr.filter(item => item);
    console.log(resArr);
    res.json(resArr);
  }
};
