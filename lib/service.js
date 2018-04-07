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

module.exports.calcul = function (cert,ts,serverRandom) {
    console.log("cert:"+cert)
    console.log("ts:"+ts)
    console.log("serverRandom:"+serverRandom)
    return $.checkTaxno(cert, ts, "", "$.bs.encode($.encrypt($.gen($.moveTo(a+b),$.moveTo($.xx(c2))))+$.gen(a,b)+$.encrypt($.xx(\"\"+$.yy(b)))).toUpperCase() ", serverRandom)
}