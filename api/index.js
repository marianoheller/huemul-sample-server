const { version } = require('../package.json');
const { Router } = require('express');

const { gitInfo, userInfo, autenticacion } = require('../middleware/user');
const { contactosTodos, clientesActivos, clientesTodos } = require('../middleware/agenda');
const { calendarioPlanificacion, eventosCalendario, externoCalendarioCSA } = require('../middleware/calendario');
const { trabajos } = require('../middleware/trabajos');

module.exports = () => {
  let api = Router();
  
  api.get('/', (req, res) => {
		res.json({ version });
  });
  
  api.get('/gitinfo', gitInfo,(req, res) => {
		res.json(res.locals.gitInfo);
  });

  api.post('/autenticacion', autenticacion,(req, res) => {
		res.json(res.locals.autenticacion);
  });
  
  api.get('/usuarios/:id', userInfo, gitInfo,(req, res) => {
		res.json(res.locals.user);
  });
  
  api.get('/contactos', contactosTodos, (req, res) => {
		res.json(res.locals.contactosTodos);
  });

  api.get('/clientes', clientesTodos, (req, res) => {
		res.json(res.locals.clientesTodos);
	});
  
  api.get('/clientesActivos', clientesActivos, (req, res) => {
		res.json(res.locals.clientesActivos);
  });

  api.get('/calendario/planificacion', calendarioPlanificacion, (req, res) => {
    res.json(res.locals.calendarioPlanificacion);
  });

  api.get('/externo/planificacion/eventos', externoCalendarioCSA, (req, res) => {
    res.json(res.locals.externoCalendarioCSA);
  });
  
  api.get('/trabajos', trabajos, (req, res) => {
    res.json(res.locals.trabajos);
  })
	return api;
}