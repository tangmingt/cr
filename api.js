const express = require('express')
const { MongoClient } = require('mongodb');
const url = require('url');
const mongodbUrl = 'mongodb://127.0.0.1:27017';
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var { api } = require('./mogo')
const fs = require('fs')




const multer = require('multer')
const upload = multer({dest: __dirname + '/'})

var date = ''

const app = express();
var cors = require('cors'); 

app.use(cors());  

app.use(express.static('public'));

app.listen(8090,()=>{
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
