
var express = require('express');
var router = express.Router();
const db = require('./../db'); // db ๋ชจ๋ ์ถ๊ฐ
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('login'); //1. ๐'login' ==> login.ejs ๋ฅผ ๋ก๊ฒจ ์จ๋ค.

  db.getAllUsers((rows) =>{
    res.render('login', { rows: rows });
  });
  //1. ejs์์ id, pw ๊ฐ์ง๊ณ  ์ค๊ธฐ
  //2. DB ๊ฐ์ฒด ๋ง๋ค๊ณ  sql ์์ฑ
  //3. id, pw๊ฐ DB์ ์๋์ง ํ์ธํด์ ์์ผ๋ฉด ๋ก๊ทธ์ธ ์ํ

});

module.exports = router;