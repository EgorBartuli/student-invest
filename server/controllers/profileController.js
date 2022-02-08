const { Profile, User } = require("../db/models");
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './storage/images');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

exports.upload = multer({ storage })

exports.profileUpdate = async (req, res) => {
  const { info, interests, country, language } = req.body;
  //IF
  const profile = await Profile.findOne({
    where: { user_id: req.session.user.id },
  });
  console.log(profile);
  if (profile === null) {
    const newProfile = new Profile({
      login: req.session.user.login,
      user_id: req.session.user.id,
      photo: `/images/${req.file.filename}`,
      info: info,
      interests: interests,
      country: country,
      language: language,
    });

    try {
      await newProfile.save();
      res.json(newProfile);
    } catch (err) {
      console.log(err);
    }
  } else {
    req.file ? (profile.photo = `/images/${req.file.filename}`) : null;
    req.body.info ? (profile.info = req.body.info) : null;
    req.body.interests ? (profile.interests = req.body.interests) : null;
    req.body.country ? (profile.country = req.body.country) : null;
    req.body.language ? (profile.language = req.body.language) : null;
    await profile.save();
    res.json(profile);
  }
};

exports.profileGet = async (req, res) => {
  const profile = await Profile.findOne({
    where: { user_id: req.session.user.id },
  });
  res.json(profile);
};

