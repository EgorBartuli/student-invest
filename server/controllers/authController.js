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
  let isAuth;

  if (req.session.user) {
    isAuth = true;

    res.json({
      status: req.session.user.status || 0,
      user: req.session.user.login || 0,
      isAuth: isAuth,
    });
  } else {
    isAuth = false;

    res.json({
      isAuth: isAuth,
    });
  }
};

exports.createUserAndSession = async (req, res, next) => {
  const { login, password, email, status } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //Проверка существует ли пользователь
    const checkUser = await User.findOne({ where: { email: email } });
    console.log(checkUser);
    if (checkUser) {
      return res.json({
        err: "Your Email is already used!",
      });
    }

    const newUser = await User.create({
      login: login,
      password: hashedPassword,
      email: email,
      status: status,
    });

    req.session.user = serializeUser(newUser);
  } catch (err) {
    console.log(err);
  }

  let isAuth;
  if (req.session.user) isAuth = true;
  res.json({
    status: req.session.user.status,
    user: req.session.user.login,
    isAuth: isAuth,
  });
};

exports.checkUserAndCreateSession = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
      raw: true,
    });
    if (!user) return failAuth(res);

    await bcrypt.compare(password, user.password);
    req.session.user = serializeUser(user);
  } catch (err) {
    console.log(err);
  }

  let isAuth;
  if (req.session.user) isAuth = true;
  res.json({
    status: req.session.user.status,
    user: req.session.user.login,
    isAuth: isAuth,
  });
};

exports.destroySession = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("sid");
    return res.status(200).end();
  });
};
