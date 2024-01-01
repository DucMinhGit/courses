const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();

const route = require('./routes');
const db = require('./config/db');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// init middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);

// Connect to DB
db.connect();

// Template engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// handling error

module.exports = app;
