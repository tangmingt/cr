const express = require('express')
const app = express();
app.use(express.static('public'));
app.listen(8090,()=>{
    console.log('qidong')
})



app.get('/',(req,res) =>{
res.end('66666666')
})