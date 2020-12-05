var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect('mongodb://localhost/blog-cms', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(()=>{
    return console.log('connection successful');
}).catch((err)=> console.log(err));


var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/posts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
