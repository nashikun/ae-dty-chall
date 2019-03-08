const express = require('express');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cachegoose = require('cachegoose');
cachegoose(mongoose, {
    engine: 'redis',
    port: 17844,
    host: 'redis-17844.c57.us-east-1-4.ec2.cloud.redislabs.com',
    password: '5ihSF2Qa9BNMp9t7dNewNdW5sLXOTsz1'
});

const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.crt', 'utf8');

const animes = require('./controllers/animes');
const users = require('./controllers/users');

const db = 'mongodb://AEDTYCHALL:8TsJ3sAoZzVD5Jiu@cluster0-shard-00-00-eilxa.mongodb.net:27017,cluster0-shard-00-01-eilxa.mongodb.net:27017,cluster0-shard-00-02-eilxa.mongodb.net:27017/MAL?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

const app = express();
const httpsServer = https.createServer({key: privateKey, cert: certificate}, app);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(db, {useNewUrlParser: true}, err => {
    if (err) console.error(err);
});


app.use(cors());
app.use(helmet());

/*app.use(function (req, res, next) {
    if (!req.secure) {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
});*/

app.use(bodyParser.json({limit: '2mb', extended: true}));

app.use('/images', express.static('images'));

app.use('/animes', animes);

app.use('/users', users);

app.get('/', function (req, res) {
});

httpsServer.listen(3000);

// TODO : add comments, animelist statistics
//  handle token expiration

//  add caching to the sorting


