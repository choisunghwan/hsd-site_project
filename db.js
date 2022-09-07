// db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    port:3307,
    database:'NODE_DB',
    dateStrings: 'date'
});

function getAllMemos(callback){
    connection.query(`SELECT * FROM MEMOS ORDER BY ID DESC`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

function insertMemo(content, callback){
    connection.query(`INSERT INTO MEMOS (CONTENT, CREATED_AT, UPDATED_AT) VALUES ('${content}',NOW(),NOW())`, (err, result) =>{
        if (err) throw err;
        callback();
    });
}

function getMemoById(id, callback){
    connection.query(`SELECT * FROM MEMOS WHERE ID =${id}`, (err,row, fields) =>{
        if(err) throw err;
        callback(row);
    });
}

function updateMemoById(id, content , callback){
    connection.query(`UPDATE MEMOS SET CONTENT='${content}', UPDATED_AT=NOW() WHERE ID=${id}`, (err, result) => {
        if(err) throw err;
        callback();
    });
}

function deleteMemoById(id, callback){
    connection.query(`DELETE FROM MEMOS WHERE ID=${id}`, (err, result) =>{
        if(err) throw err;
        callback();
    });
}

module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById
}









/**콘솔창에 db 데이터 찍어보기 */
// connection.query("SELECT * from users", (error, rows, fields) => {
//     if (error) throw error;     //throw err = console.log(error) 과 같은의미
//     console.log("User info is: ", rows); //db 연동이 된 경우 출력
// });
// connection.end(); //db 연결 종료


// connection.connect(function(err) {
//     if (err) throw err;  // throw err = console.log(error) 과 같은의미
//     console.log('data base connect 100%'); // db연동이 된경우에 출력
// });

// module.exports = connection;

// conn.query('SELECT * FROM users', (error, results) => {
//     if(error) throw error;
//     console.log('DATA RECEIVE:');
//     console.log(results);
// })
