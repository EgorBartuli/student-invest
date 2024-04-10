const bcrypt = require('bcrypt');
const { User } = require('../db/models');

function failAuth(res) {
  return res.status(401).end();
}

function serializeUser(user) {
  return {
    id: user.id,
    login: user.login,
    status: user.status,
  };
}

exports.isUser = async (req, res) => {
  const isAuth = !!req.session.user;

  res.json({
    status: req.session.user?.status || 0,
    user: req.session.user?.login || 0,
    isAuth,
  });
};

exports.createUserAndSession = async (req, res) => {
  const { login, password, email, status } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkUser = await User.findOne({ where: { email } });
    if (checkUser) {
      return res.json({
        err: "Your Email is already used!",
      });
    }

    const newUser = await User.create({
      login,
      password: hashedPassword,
      email,
      status,
    });

    req.session.user = serializeUser(newUser);
  } catch (err) {
    console.log(err);
  }

  const isAuth = !!req.session.user;
  res.json({
    status: req.session.user?.status,
    user: req.session.user?.login,
    isAuth,
  });
};

exports.checkUserAndCreateSession = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
      raw: true,
    });
    if (!user) return failAuth(res);

    await bcrypt.compare(password, user.password);
    req.session.user = serializeUser(user);
  } catch (err) {
    console.log(err);
  }

  const isAuth = !!req.session.user;
  res.json({
    status: req.session.user?.status,
    user: req.session.user?.login,
    isAuth,
  });
};

exports.destroySession = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("sid");
    return res.status(200).end();
  });
};

