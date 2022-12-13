const express = require('express');
const parser = require('body-parser');
const registerRoutes = require('./routes/registerRoutes');
const path = require('path');
const cookieSession = require('cookie-session');
const {engine} = require('express-handlebars');
const authenticationMiddleware = require('./middlewares/authenticationMiddleware');

// Creating an express app.
const app = express();

// Configuring the express app to use handlebars template engine.
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views'))

// Configuring body parser.
app.use("/", parser.urlencoded({extended: true}));

// Configuring static files middleware.
// app.use("/static", express.static(path.join(__dirname, 'static')));

app.use(cookieSession({
    name: 'session',
    httpOnly: true,
    keys: ["asdghjhgsdahjsgdhjasd"],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(authenticationMiddleware);
app.use(registerRoutes);



app.listen(80);