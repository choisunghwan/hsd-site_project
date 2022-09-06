const ejs = require('ejs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//라우팅

var indexRouter = require('./routes/index');
var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');
var cshRouter = require('./routes/csh');
var menusRouter = require('./routes/menus');
// var usersRouter = require('./routes/users');
// var coronachartRouter = require('./routes/coronachart');
// var coronapickerRouter = require('./routes/coronapicker');
// var imagesearchRouter = require('./routes/imagesearch');
// var airRouter = require('./routes/air');
// var videosearchRouter = require('./routes/videosearch');

var app = express();

// view engine setup <ejs 템플릿엔진 사용>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//부트스트랩 사용
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS  
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(express.static("views"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//API? 
app.use('/', indexRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/csh', cshRouter);
app.use('/menus', menusRouter);
// app.use('/users', usersRouter);
// app.use('/coronachart', coronachartRouter);
// app.use('/coronapicker', coronapickerRouter);
// app.use('/ssimg', imagesearchRouter);
// app.use('/air', airRouter);
// app.use('/ssvideo', videosearchRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
