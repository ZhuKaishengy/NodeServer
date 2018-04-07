#### NodeServer使用nodejs搭建服务端
1. npm init
2. npm install express,body-parser --save-dev
3. 搭建服务端（controller）
```
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var hostName = '127.0.0.1';
var port = 9001;

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
    var result = service.calcul(cert,ts,serverRandom)
    console.log('result:'+result)
    var MSG = {code:1001,msg:"成功！",result:result};
    res.send(MSG);
})

app.listen(port,hostName,function(){
    console.log('服务器运行在http://'+ hostName+':'+ port);
});

```
4. 在js server中引入jquery
 > npm install jquery --save-dev

 > 在node中没有window对象，创建window对象，加入global中

 >  npm install jsdom --save-dev

 > var jsdom = require('jsdom');
   const {JSDOM} = jsdom;
   const {document} = (new JSDOM('<!doctype html><html id="test"></html>')).window;
   global.window = document.defaultView;
   global.document = document;
   global.jQuery = require('jquery')(window);
   global.$ = jQuery


 > 加入依赖的其他模块
    require('./m.q.d.min.c2725c10.js')
    require('./q.b.a.min.js')
    require('./s.d.b.min.js')
    require('./t.q.d.min.js')
    require('./t.q.z.min.js')

5.  注意在此项目中的创建的window对象和和原生的window对象有不同
```
window.innerHeight=330
window.innerWidth=1536
window.screen.height=864
window.screen.weight=1536
document.documentElement.clientWidth = 1536
document.documentElement.clientHeight=743
document.body.clientWidth=1520
document.body.clientHeight=0
```