const express=require("express");
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
 
var app=express();
 app.use(express.static('public'));
app.post('/',multipartMiddleware,function(req,res){
    res.send(req.body);
    console.log(req.body)
    
});
 
app.listen(8080);