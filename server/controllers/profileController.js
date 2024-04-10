const { Profile } = require("../db/models");
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

exports.upload = multer({ storage });

exports.profileUpdate = async (req, res) => {
  const { info, interests, country, language } = req.body;
  const profile = await Profile.findOne({
    where: { user_id: req.session.user.id },
  });

  if (profile === null) {
    const newProfile = new Profile({
      login: req.session.user.login,
      user_id: req.session.user.id,
      photo: `/images/${req.file.filename}`,
      info,
      interests,
      country,
      language,
    });

    try {
      await newProfile.save();
      res.json(newProfile);
    } catch (err) {
      console.error(err);
    }
  } else {
    if (req.file) {
      profile.photo = `/images/${req.file.filename}`;
    }
    if (req.body.info) {
      profile.info = req.body.info;
    }
    if (req.body.interests) {
      profile.interests = req.body.interests;
    }
    if (req.body.country) {
      profile.country = req.body.country;
    }
    if (req.body.language) {
      profile.language = req.body.language;
    }

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


