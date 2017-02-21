var express = require('express');
var path = require('path');//指定静态文件中间件
var bodyParser = require('body-parser');//请求解析中间件
var Book = require('./db').Book;//这是依赖过来的模型
var app = express();

app.use(express.static(path.resolve('node_modules')));//指定静态文件根目录
app.use(express.static(path.resolve('views')));//指定静态文件根目录,返回首页的html
app.use(bodyParser.urlencoded({extended: true}));//处理请求体格式为查询字符串的请求体。
app.use(bodyParser.json());
/*app.get('/', function (req, res) {
 res.render('index')
 });*/
//图书列表
app.get('/books', function (req, res) {
    Book.find({}, function (err, docs) {
        res.send(docs);
    })
});
//获取某本图书信息（进入详情页）
app.get('/books/:id', function (req, res) {
    var id = req.params.id;
    Book.findById(id, function (err, doc) {
        res.send(doc);
    })
});
//修改图书信息
app.put('/books/:id', function (req, res) {
    var id = req.params.id;
    var obj = req.body;
    Book.update({_id: id}, obj, function (err, doc) {
        res.send(obj);
    })
});
//删除图书
app.delete('/books/:id', function (req, res) {
    var id = req.params.id;
    Book.remove({_id: id}, function (err, result) {
        res.send(JSON.stringify({}));
    })
});
//添加新图书
app.post('/books', function (req, res) {
    var obj = req.body;
    // console.log(obj);
    Book.create(obj, function (err, doc) {
        res.send(doc);
    })
});

//用于进行重新定位，当直接访问前端路由时，走这里。
app.all('*', function (req, res) {
    res.redirect('/')
});
app.listen(9090);
