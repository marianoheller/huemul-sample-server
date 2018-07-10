const sampleUserInfo = require('../samples/userInfo');

const gitInfo = (req, res, next) => {
  const major = Math.floor(3*Math.random());
  const minor = Math.floor(9*Math.random());
  const patch = Math.floor(30*Math.random());
  res.locals.gitInfo = {
    buildVersion: `${major}.${minor}.${patch}`,
  };
  next();
};

const userInfo = (req, res,next) => {
  res.locals.user = sampleUserInfo;
  next();
};

const autenticacion = (req, res,next) => {
  res.locals.autenticacion = {
    token: 'akjsdkasjdasdnaskdnaskjn',
    usuarioId: 123,
  };
  next();
};


module.exports = {
  gitInfo,
  userInfo,
  autenticacion,
};
