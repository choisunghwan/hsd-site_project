var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('loginsuccess'); //1. 😀'loginsuccess' ==> loginsuccess.ejs 를 땡겨 온다.
});

module.exports = router;
