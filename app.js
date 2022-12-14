const ejs = require('ejs');
var createError = require('http-errors');
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//라우팅

var indexRouter = require('./routes/index');
var joinRouter = require('./routes/join');
var loginRouter = require('./routes/login');
var cshRouter = require('./routes/csh');
var menusRouter = require('./routes/menus');
var locateRouter = require('./routes/locate');
var bbsRouter = require('./routes/bbs');
var newMemoRouter = require('./routes/newMemo');
var updateMemoRouter = require('./routes/updateMemo');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup <ejs 템플릿엔진 사용>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//부트스트랩 사용
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS  
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(express.static("views"));
app.use(logger('dev'));
app.use(express.json()); //json 형태로 뿌려주기
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//API? 
app.use('/', indexRouter);
app.use('/join', joinRouter);
app.use('/login', loginRouter);
app.use('/csh', cshRouter);
app.use('/menus', menusRouter);
app.use('/locate', locateRouter);
app.use('/bbs', bbsRouter);
app.use('/newMemo',newMemoRouter);
app.use('/updateMemo',updateMemoRouter);
app.use('/users', usersRouter);


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
