var express = require('express');
var router = express.Router();
const db = require('./../db'); // db 모듈 추가
const {check, validationResult} = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('newMemo'); //1. 😀'menu' ==> menu.ejs 를 땡겨 온다.

});

router.post('/store', [check('content').isByteLength({min:1, max:500})], function(req, res, next){
    console.log("store에 접속성공");
    console.log("store에 접속성공");

    let errs = validationResult(req);
    console.log(errs);
    if(errs['errors'].length > 0){ //화면에 에러 출력하기 위함
      res.render('newMemo',{errs:errs['errors']});
    }else{
      let param = JSON.parse(JSON.stringify(req.body));
      db.insertMemo(param['content'],() =>{
        res.redirect('/bbs');
      });
    }
  });

module.exports = router;

