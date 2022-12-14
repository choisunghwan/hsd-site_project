var express = require('express');
var router = express.Router();
const db = require('./../db'); // db 모듈 추가
const {check, validationResult} = require('express-validator');

//page move : updateMemo
// router.get('/updateMemo', (req, res) =>{
  router.get('/', (req, res) =>{
    let id = req.query.id;

    db.getMemoById(id, (row)=>{
      if(typeof id === 'undefinde' || row.length <= 0){
        res.status(404).json({error:'undefinde memo'});
      }else{
        res.render('updateMemo',{row:row[0]});
      }
    });
});


router.post('/updateMemo', [check('content').isLength({min:1, max:500})], (req, res) =>{
  let errs = validationResult(req);

  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let content = param['content'];

  if(errs['errors'].length > 0){ //화면에 에러 출력하기 위함

    db.getMemoById(id, (row)=>{ //유효성 검사에 적합하지 않으면 정보를 다시 조회 후, updateMemo 페이지를 다시 랜더링한다.
      res.render('updateMemo',{row:row[0], errs:errs['errors']});
    });
  }else{
    db.updateMemoById(id, content, () =>{
      // res.redirect('/');
      res.redirect('/bbs');
    });
  }
});
module.exports = router;
