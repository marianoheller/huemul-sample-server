require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const api = require('./api');


// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: ["Link"],
}));
app.use(bodyParser.json({
	limit: "100kb",
}));


app.use('/api', api());
app.get('/', (req, res) => res.send('Huemul sample server'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
