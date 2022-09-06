var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('login'); //1. 😀'login' ==> login.ejs 를 땡겨 온다.
});

module.exports = router;
