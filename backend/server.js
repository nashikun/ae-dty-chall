require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const http = require('http');
const https = require('https');
const fs = require('fs');
const path =require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cachegoose = require('cachegoose');
cachegoose(mongoose, {
    engine: 'redis',
    port: process.env.CACHE_PORT,
    host: process.env.CACHE_HOST,
    password: process.env.CACHE_PWD
});

const animes = require('./controllers/animes');
const users = require('./controllers/users');

const db = process.env.DB;

const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.crt', 'utf8');

const app = express();
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);
//const httpServer = http.createServer(app);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(db, {useNewUrlParser: true}, err => {
    if (err) console.error(err);
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE,HEAD, OPTIONS"
    );
    next();
});

//app.use(cors());
app.use(helmet());

app.use(bodyParser.json({limit: '2mb', extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/animes', animes);

app.use('/users', users);

app.get('/', function (req, res) {
});

httpsServer.listen(3000);

// TODO : add comments, animelist statistics
//  handle token expiration

//  add caching to the sorting


