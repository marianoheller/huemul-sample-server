const axios = require('axios');
const format = require('date-fns/format');

const { randomDateTime } = require('../utils');

const externoCalendarioCSASamples = require('../samples/externoCalendarioCSA');
const eventosCalendarioSamples = require('../samples/eventosCalendario');
const calendarioPlanificacionSamples = require('../samples/calendarioPlanificacion');


const noLaborables = (req, res, next) => {
  const currentYear = (new Date()).getFullYear();
  axios.get(`http://nolaborables.com.ar/api/v2/feriados/${currentYear}`)
  .then(response => {
    res.locals.noLaborables = response.data.map(fer => ({
      fecha: `${currentYear}-${pad(fer.mes, 2)}-${pad(fer.dia, 2)}`,
      nombre: fer.motivo,
    }));
    next();
  })
  .catch(err => {
    res.locals.noLaborables = [
      { nombre:"Año Nuevo", fecha: `${currentYear}-01-01`},
      { nombre:"Día de la Independencia",fecha: `${currentYear}-07-09`},
    ];
    next();
  });


  function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }
};


const externoCalendarioCSA = (req, res, next) => {
  const finishing = randomDateTime();
  const starting = randomDateTime(finishing);

  res.locals.externoCalendarioCSA = externoCalendarioCSASamples.map(t => ({
    ...t,
    fechaComienzo: format(starting, 'YYYY-MM-DD'),
    tiempoComienzo: format(finishing, 'HH:mm:ss'),
    fechaFin: format(finishing, 'YYYY-MM-DD'),
    tiempoFin: format(finishing, 'HH-mm-ss'),
  }));
  next();
}

const eventosCalendario = (req, res, next) => {
  const finishing = randomDateTime();
  const starting = randomDateTime(finishing);

  res.locals.eventosCalendario = eventosCalendarioSamples.map(t => ({
    ...t,
    fechaComienzo: format(starting, 'YYYY-MM-DD'),
    tiempoComienzo: format(finishing, 'HH:mm:ss'),
    fechaFin: format(finishing, 'YYYY-MM-DD'),
    tiempoFin: format(finishing, 'HH-mm-ss'),
  }));
  next();
}

const calendarioPlanificacion = (req, res, next) => {
  const finishing = randomDateTime();
  const starting = randomDateTime(finishing);

  res.locals.calendarioPlanificacion = {
    eventos: calendarioPlanificacionSamples.eventos.map(t => ({
      ...t,
      fechaComienzo: format(starting, 'YYYY-MM-DD'),
      tiempoComienzo: format(finishing, 'HH:mm:ss'),
      fechaFin: format(finishing, 'YYYY-MM-DD'),
      tiempoFin: format(finishing, 'HH-mm-ss'),
    })),
    remanentes: calendarioPlanificacionSamples.remanentes,
  };
  next();
}


module.exports = {
  noLaborables,
  externoCalendarioCSA,
  eventosCalendario,
  calendarioPlanificacion,
};
