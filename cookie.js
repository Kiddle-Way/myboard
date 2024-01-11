let cookieParser = require('cookie-parser');

app.use(cookieParser());
app.get('/cookie', function (req, res) {
    res.cookie('milk', '1000원');
    res.send('product : ' + req.cookie.milk);
});