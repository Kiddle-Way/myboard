// 모듈을 추출합니다.
const exp = require('constants');
const express = require('express');

// 서버를 생성/실행합니다.
const app = express();
app.listen(52273, () => {
    console.log('Server Running at http://127.0.0.1:52273');
});

// 미들웨어를 추가합니다.
app.use(express.urlencoded({
    extended: false
}))

// 변수를 선언합니다.
let userCounter = 0;
const users = [];

app.get('/user', (req, res) => {
    res.send(users);
})

app.get('/user/:id', (req, res) => {
    //변수를 선언합니다.
    const id = req.params.id;
    // 데이터를 찾습니다.
    const filtered = users.filter((user) => user.id == id);
    // 응답합니다.
    if (filtered.length == 1)
        res.send(filtered[0]);
    else
        res.status(404).send('데이터가 존재하지 않습니다.');
});

app.post('/user', (req, res) => {
    //변수를 선언합니다.
    const body = req.body;
    //예외를 처리합니다.
    if (!body.name)
        return res.status(400).send('name을 보내주세요');
    else if (!body.region)
        return res.status(400).send('region을 보내주세요');
    //변수를 추출합니다.
    const name = body.name;
    const region = body.region;
    // 데이터를 저장합니다.
    const data = {
        id: userCounter++,
        name: name,
        region: region
    };
    users.push(data);
    //응답합니다.
    res.send(data);
});

app.put('/user/:id', (req, res) => {
    //데이터를 찾습니다.
    const id = req.params.id
    const user = users.find((user) => user.id == id)
    if (user) {
        //데이터가 존재한다면
        if (req.body.name)
            users[id].name = req.body.name;
        if (req.body.region)
            users[id].region = req.body.region;
        res.send(user)
    } else {
        //데이터가 존재한다면
        //응답합니다.
        res.status(404).send('데이터가 존재하지 않습니다.');
    }
});

app.delete('/user/:id', (req, res) => {
    //변수를 선언합니다.
    const id = req.params.id
    const index = users.findIndex((user) => user.id == id)
    //데이터를 제거합니다.
    if (index != -1) {
        users.splice(index, 1);
        res.send('제거했습니다.');
    } else {
        res.status(404).send('데이터가 존재하지 않습니다.');
    }
});