const path = require('path');
const morgan = require('morgan');
const express = require('express');
const uuid = require('uuid/v4');
const Request = require("request");
const cors = require('cors');
const bodyParser = require('body-parser');

var session = require('cookie-session');
const DB = require('./api/db');


const app = express();
//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleares 
app.use(morgan('dev'));
app.use(session({
    secret: 'my cats name again',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false, // key
        maxAge: null
    }
}))

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    credentials: false,
    origin: 'http://localhost:5500'
}));

//static
app.use(express.static(path.join(__dirname, '/public')));


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


//routes
require('./routes/index')(app, uuid, DB, Request);

// 404 handler
app.use((req, res, next) => {
    //res.status(404).send('404 not found');
    res.render('404');
});

module.exports = app;