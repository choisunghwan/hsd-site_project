var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('menus'); //1. 😀'menu' ==> menu.ejs 를 땡겨 온다.
});

module.exports = router;
