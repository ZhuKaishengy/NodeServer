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

function Request (cert,ts,serverRandom,page) {
    this.cert = cert
    this.ts = ts
    this.serverRandom = serverRandom
    this.page = page
}
function InvConf (cert,token,ts,page) {
    this.cert = cert
    this.ts = ts
    this.token = token
    this.page = page
}

app.post('/checkTaxNo',function(req,res){

    var request = new Request(req.param('cert'),req.param('ts'),req.param('serverRandom'),req.param('page'))
    var cert= request.cert
    var ts= request.ts
    var serverRandom= request.serverRandom
    var page = request.page
    var result = service.calculcheckTaxNo(cert,ts,serverRandom,page)
    var MSG = {code:1001,msg:"成功！",result:result};

    console.log('result:'+result)
    console.log('========================')
    res.send(MSG);
})

app.post('/checkInvConf',function(req,res){

    var invConf = new InvConf(req.param('cert'),req.param('token'),req.param('ts'),req.param('page'))
    var cert= invConf.cert
    var token= invConf.token
    var ts= invConf.ts
    var page = invConf.page

    var result = service.calculCheckInvConf(cert,token,ts,page)
    var MSG = {code:1001,msg:"成功！",result:result};

    console.log('result:'+result)
    console.log('========================')
    res.send(MSG);
})

app.listen(port,hostName,function(){
    console.log('服务器运行在http://'+ hostName+':'+ port);
});

process.on('uncaughtException', function (err) {
    logger.error(err);
});

