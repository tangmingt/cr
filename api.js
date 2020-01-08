const express = require('express')
const { MongoClient } = require('mongodb');
const url = require('url');
const mongodbUrl = 'mongodb://127.0.0.1:27017';
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var { api } = require('./mogo')
const fs = require('fs')
const socketIo = require('socket.io')



const multer = require('multer')
const upload = multer({dest: __dirname + '/'})

var date = ''

const app = express();


var cors = require('cors'); 

app.use(cors());  

app.use(express.static('public'));

const server = app.listen(8090,()=>{
    console.log('qidong')
})


app.get('/',(req,res)=>{
    // console.log(url.parse(req.url,true).query.a)
    // console.log(req.headers)
    MongoClient.connect(mongodbUrl,{useUnifiedTopology: true}, (err, client) => {
        if (err) throw err;
        const db = client.db('day');
        // console.log('数据库连接成功')
        const collection = db.collection('user_id');
        collection.find({}, {"_id": 0}).toArray((err, data) => {
            if (err) throw err;
            // console.log(data)
            date = data;
            res.json(date)
            client.close();
        })
    })
})

app.post('/class',multipartMiddleware,(req,res)=>{
    console.log(req.body)
    var id , pw
    id = Number(req.body.id)
    pw = req.body.pw
    api.ap(id)
    .then(data => {
        console.log(data,'-----')
        if(pw == data[0].pw){
            res.json(id) 
        }
    })
    .catch(err => {console.log(err,'-------')
    res.send('错误')})
     var list = [{a: '1'}]
})


app.post("/addGoods2",upload.single("file"),function(req,res){
    var fileName="";
    console.log(req);
    if(req.file!=undefined){
        fileName=new Date().getTime()+"_"+req.file.originalname;
        console.log(req.file.path)
        console.log(__dirname,'==============')
        console.log(req.file.path)
        console.log(fileName)
         fs.renameSync(req.file.path,__dirname+"/"+fileName);      //重命名，加后缀，不然图片会显示乱码，打不开
    }
    res.send("1");
});

app.post('/addleave',multipartMiddleware,(req,res)=>{
    console.log(req.body)
        console.log('-----')
        api.addList()
    .then(data => {
        console.log(data,'-----')
       
    })
    .catch(err => {console.log(err,'-------')
    res.send('错误')})
        res.send({a:'11'})
})

var io=new socketIo(server)
io.on("connection",function (clientSocket) {
    // socket.io 使用 emit(eventname,data) 发送消息，使用on(eventname,callback)监听消息
    console.log(222)
    //加入房间
    clientSocket.on("joinRoom",function (data,fn) {
        clientSocket.join(data.roomName); // join(房间名)加入房间
        fn({"code":0,"msg":"加入房间成功","roomName":data.roomName});
    });
    //退出 离开房间
    clientSocket.on("leaveRoom",function (data,fn) {
        clientSocket.leave(data.roomName);//leave(房间名) 离开房间
        fn({"code":0,"msg":"已退出房间","roomName":data.roomName});
    });
    //监听客户端发送的 sendMsg 事件
    clientSocket.on("sendMsg",function (data,fn) {
        // data 为客户端发送的消息，可以是 字符串，json对象或buffer

        // 使用 emit 发送消息，broadcast 表示 除自己以外的所有已连接的socket客户端。
        // to(房间名)表示给除自己以外的同一房间内的socket用户推送消息
        clientSocket.broadcast.to(data.roomName).emit("receiveMsg",data);
        fn({"code":0,"msg":"消息发生成功"});
    })
});