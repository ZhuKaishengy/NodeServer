var jsdom = require('jsdom');
const {JSDOM} = jsdom;
const {document} = (new JSDOM('<!doctype html><html id="test"></html>')).window;

global.window = document.defaultView;

global.document = document;

global.jQuery = require('jquery')(window);
global.$ = jQuery

require('./m.q.d.min.c2725c10.js')
require('./q.b.a.min.js')
require('./s.d.b.min.js')
require('./t.q.d.min.js')
require('./t.q.z.min.js')

module.exports.calculcheckTaxNo = function (cert,ts,serverRandom,page) {
    console.log("cert:"+cert)
    console.log("ts:"+ts)
    console.log("serverRandom:"+serverRandom)
    console.log("page:"+page)
    //"$.bs.encode($.encrypt($.gen($.moveTo(a+b),$.moveTo($.xx(c2))))+$.gen(a,b)+$.encrypt($.xx(\"\"+$.yy(b)))).toUpperCase() "
    return $.checkTaxno(cert, ts, "", page, serverRandom)
}
module.exports.calculCheckInvConf = function (cert,token,ts,page) {
    console.log("cert:"+cert)
    console.log("token:"+token)
    console.log("ts:"+ts)
    console.log("page:"+page)
    //"$.bs.encode($.encrypt($.gen($.moveTo(a+b),$.moveTo($.xx(c2))))+$.gen(a,b)+$.encrypt($.xx(\"\"+$.yy(b)))).toUpperCase() "
    return $.checkInvConf(cert,token , ts ,'',page);
}