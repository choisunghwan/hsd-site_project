var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('csh'); //1. 😀'csh' ==> csh.ejs를 땡겨 온다.


});

module.exports = router;

