var http = require('http');
var optfile = require('./servae');
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type' : 'image/jpeg'});
    if(request.url != '/favicon.ico'){
        optfile.readImg('./public/image3.jpg',response);
        // console.log( optfile.readImg('./public/image3.jpg'),'00000')
        console.log("主程序结束");
    }   
}).listen(8000);

console.log('Server running at http://127.0.0.1:8000');
