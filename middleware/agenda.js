const sampleClientesActivos = require('../samples/clientesActivos');
const sampleClientesTodos = require('../samples/clientesTodos');
const sampleContactosTodos = require('../samples/contactosTodos');

const contactosTodos = (req, res, next) => {
  res.locals.contactosTodos = sampleContactosTodos;
  next();
};

const clientesTodos = (req, res, next) => {
  res.locals.clientesTodos = sampleClientesTodos;
  next();
};

const clientesActivos = (req, res, next) => {
  res.locals.clientesActivos = sampleClientesActivos;
  next();
};


module.exports = {
  contactosTodos,
  clientesTodos,
  clientesActivos,
};
