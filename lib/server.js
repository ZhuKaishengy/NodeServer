var service = require('./service')
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var hostName = '127.0.0.1';
var port = 8080;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

function Request (cert,ts,serverRandom) {
    this.cert = cert
    this.ts = ts
    this.serverRandom = serverRandom
}

app.post('/checkTaxNo',function(req,res){
    var request = new Request(req.param('cert'),req.param('ts'),req.param('serverRandom'))
    var cert= request.cert
    var ts= request.ts
    var serverRandom= request.serverRandom
    console.log(cert,ts,serverRandom)
    var result = service.calcul(cert,ts,serverRandom)
    var MSG = {code:1001,msg:"成功！",result:result};
    res.send(MSG);
})

app.listen(port,hostName,function(){
    console.log('服务器运行在http://'+ hostName+':'+ port);
});


