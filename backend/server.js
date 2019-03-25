require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cachegoose = require('cachegoose');
cachegoose(mongoose, {
  engine: 'redis',
  port: process.env.CACHE_PORT,
  host: process.env.CACHE_HOST
});
const passport = require('passport');

//controllers
const animes = require('./controllers/animes');
const users = require('./controllers/users');
const auth = require('./controllers/auth');

const db = process.env.DB;

// SSL
const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.crt', 'utf8');

const app = express();
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
//const httpServer = http.createServer(app);

// Models
const models = './models/';
const User = require(models + 'user');
const List = require(models + 'list');
const Profile = require(models + 'profile');
const Message = require(models + 'message');


// Mongoose
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(db, {useNewUrlParser: true}, err => {
  if (err) console.error(err);
});

app.use(function (req, res, next) {
  res.header('Accept', 'multipart/form-data,application/json');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,HEAD');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Authorization, Accept, x-auth-token');
  if (req.method === 'OPTIONS') {
    res.status(204).end()
  } else {
    next()
  }
});

app.use(helmet());
app.use(bodyParser.json({limit: '2mb', extended: true}));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/animes', animes);

app.use('/users', users);

app.use('/auth', auth);

httpsServer.listen(3000);

// TODO : add comments, animelist statistics
//  handle token expiration

//  add caching to the sorting


