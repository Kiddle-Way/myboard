const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:1234@kimhojoong.xi508qt.mongodb.net/?retryWrites=true&w=majority';
let mydb;
mongoclient.connect(url)
    .then(client => {
        mydb = client.db('myboard');
        // mydb.collection('post').find().toArray().then(result => {
        //     console.log(result);
        // })

        app.listen(8080, function () {
            console.log("포트 8080으로 서버 대기중 ... ")
        });
    })
    .catch(err => {
        console.log(err);
    })

//Mysql + node.js 접속코드
var mysql = require('mysql2')
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'myboard',
});

conn.connect();

const express = require('express')
const app = express();

//body-parser 라이브러리 추가
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/book', function (req, res) {
    res.send('도서 목록 관련 페이지입니다.')
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/list', function (req, res) {
    //conn.query("select * from post", function (err, rows, fields) {
    //    if (err) throw err;
    //    console.log(rows);
    // });
    mydb.collection('post').find().toArray().then(result => {
        console.log(result);
        res.render('list.ejs', { data: result });
    })
    //res.sendFile(__dirname + '/list.html');
    //res.render('list.ejs');
});

//'/enter' 요청에 대한 처리 루틴
app.get('/enter', function (req, res) {
    res.sendFile(__dirname + '/enter.html');
});

//'/save' 요청에 대한 post 방식의 처리 루틴
app.post('/save', function (req, res) {
    console.log(req.body.title);
    console.log(req.body.content);
    let sql = "insert into post (title, content, created) values(?,?,Now())";
    let params = [req.body.title, req.body.content];
    conn.query(sql, params, function (err, result) {
        if (err) throw err;
        console.log('데이터 추가 성공');
    });
    res.send('데이터 추가 성공');
});