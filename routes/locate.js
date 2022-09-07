var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('locate'); //1. 😀'locate' ==> locate.ejs 를 땡겨 온다.
});

module.exports = router;
