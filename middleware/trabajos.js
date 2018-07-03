const trabajosSamples = require('../samples/trabajos');

const searchFieldMap = {
  'numero.numero': 'legajo',
  'nombre.nombre': 'nombre',
  'ot.ot': 'ot',
  'cliente.cliente': 'clientes',
  'contacto.contacto': 'contactos',
};

const fieldKeysMap = {
  clientes: [
    "id",
    "razonSocial",
    "telefono",
    "fax",
    "domicilio",
    "localidad",
    "provincia",
  ],
  contactos: [
    "id",
    "nombre",
    "mail",
  ]
};


const trabajos = (req, res, next) => {
  const { _query } = req.query;
  if (!_query) {
    res.locals.trabajos = [],
    next();
    return;
  }
  const __parsedQuery = _query.split('&')[0].split('==');
  const parsedQuery = {
    key: searchFieldMap[__parsedQuery[0]],
    value: __parsedQuery[1],
  };
  if (!parsedQuery.key) {
    res.locals.trabajos = [],
    next();
    return;
  }

  const currentYear = (new Date()).getFullYear();
  const randomMonth = () => Math.ceil(12*Math.random());
  const randomDay = () => Math.ceil(28*Math.random());

  res.locals.trabajos = trabajosSamples.filter(t => {
    if (parsedQuery.key === 'clientes' || parsedQuery.key === 'contactos') {
      return t[parsedQuery.key].some(c => Object.values(c).some(v => v.includes(parsedQuery.value)));
    }
    return t[parsedQuery.key].includes(parsedQuery.value)
  }).map(t => ({
    ...t,
    fechaPedido: `${currentYear-Math.floor(2*Math.random())}-${randomMonth()}-${randomDay()}`,
  }));
  next();
};


module.exports = {
  trabajos,
};
