var express = require('express');
var router = express.Router();
const db = require('./../db'); // db 모듈 추가
const {check, validationResult} = require('express-validator');

router.get('/deleteMemo', (req, res) =>{
    let id = req.query.id;
    db.deleteMemoById(id, () =>{
      res.redirect('/bbs');
    });
  });

module.exports = router;