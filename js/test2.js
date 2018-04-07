
var checkTaxno =  function(a, b, c, d, e) {
    var c2 = "";
    return c2 = encrypt(xx(a) + b),
        c2 = encrypt(gen(c2, yy(a)) + moveTo(b) + bsEncode(yy(gen(b, a))) + gen(bsEncode(c2), xx(moveTo(c2.length + b)))).toUpperCase(),
        cc2 = eval(d),
        cc2 = encrypt(cc2),
        cc2
}
var yy =  function(r) {
    return r.length + 5 * r.length
}
var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var n = "=";
var bsEncode = function(r) {
    if (1 !== arguments.length) throw "SyntaxError: exactly one argument required";
    var t, a, c = [],
        o = (r = String(r)).length - r.length % 3;
    if (0 === r.length) return r;
    for (t = 0; t < o; t += 3) a = e(r, t) << 16 | e(r, t + 1) << 8 | e(r, t + 2),
        c.push(h.charAt(a >> 18)),
        c.push(h.charAt(a >> 12 & 63)),
        c.push(h.charAt(a >> 6 & 63)),
        c.push(h.charAt(63 & a));
    switch (r.length - o) {
        case 1:
            a = e(r, t) << 16,
                c.push(h.charAt(a >> 18) + h.charAt(a >> 12 & 63) + n + n);
            break;
        case 2:
            a = e(r, t) << 16 | e(r, t + 1) << 8,
                c.push(h.charAt(a >> 18) + h.charAt(a >> 12 & 63) + h.charAt(a >> 6 & 63) + n)
    }
    return c.join("")
}

var gen = function(n, c) {
    var r, t, h, o = (o = n += "").length,
        d = encrypt(n),
        i = encrypt(n) + c;
    for ((t = new Array)[0] = "ff8080815ed2f53b015f27c2b7b9783e", t[1] = "402880bd5c76166f015c9041698e5099", t[2] = "402880bd5c76166f015c903ee811504e", r = 0; r < t.length; ++r) h = t[r];
    var a = '1086',
        w = '768';
    return a * w <= 12e4 ? encrypt(d + i + h).toUpperCase() : encrypt(d + i + h + o).toUpperCase()
    // return encrypt(d + i + h).toUpperCase()   //b3bd941b294f515141b3961993194c40
    // return encrypt(d + i + h + o).toUpperCase() //b5457f5ff13bde41ec4330590eaab13e
}

var moveTo =  function(n) {
    return encrypt(c(n))
}

var xx =  function(r) {
    return r.length >= 12 ? r.substring(0, 10) : r.substring(0, 2)
}
var d = function(r) {
    // console.log(typeof r)
    console.log(r)
    r = r+''
    r = r.replace(/\x0d\x0a/g, "\n");
    for (var n = "",t = 0; t < r.length; t++) {
        var e = r.charCodeAt(t);
        e < 128 ? n += String.fromCharCode(e) : e > 127 && e < 2048 ? (n += String.fromCharCode(e >> 6 | 192), n += String.fromCharCode(63 & e | 128)) : (n += String.fromCharCode(e >> 12 | 224), n += String.fromCharCode(e >> 6 & 63 | 128), n += String.fromCharCode(63 & e | 128))
    }
    return n
}

var hh = function(r) {
    for (var n, t = r.length,
             e = t + 8,
             o = 16 * ((e - e % 64) / 64 + 1), u = Array(o - 1), f = 0, i = 0; i < t;) f = i % 4 * 8,
        u[n = (i - i % 4) / 4] = u[n] | r.charCodeAt(i) << f,
        i++;
    return n = (i - i % 4) / 4,
        f = i % 4 * 8,
        u[n] = u[n] | 128 << f,
        u[o - 2] = t << 3,
        u[o - 1] = t >>> 29,
        u
}
// function  test() {
//     var a  = '91210100761522638026757'
//     // for (var j = 0; j < 10; j++) {
//         a = hh(a)
//         console.log(a)
//     // }
// }
// test()
// var i = function(r, o, u, f, i, c, a) {
//     return r = t(r, t(t(e(o, u, f), i), a)),
//         t(nn(r, c), o)
// }
var nn = function(r, n) {
    return r << n | r >>> 32 - n
}
var e = function(r, n, t) {
    return r & n | ~r & t
}
var t = function(r, n) {
    var t, e, o, u, f;
    return o = 2147483648 & r,
        u = 2147483648 & n,
        t = 1073741824 & r,
        e = 1073741824 & n,
        f = (1073741823 & r) + (1073741823 & n),
        t & e ? 2147483648 ^ f ^ o ^ u: t | e ? 1073741824 & f ? 3221225472 ^ f ^ o ^ u: 1073741824 ^ f ^ o ^ u: f ^ o ^ u
}
var c = function(r, e, u, f, i, c, a) {
    return r = t(r, t(t(o(e, u, f), i), a)),
        t(nn(r, c), e)
}
var o = function(r, n, t) {
    return r & t | n & ~t
}
var a = function(r, e, o, f, i, c, a) {
    return r = t(r, t(t(u(e, o, f), i), a)),
        t(nn(r, c), e)
}
var u = function(r, n, t) {
    return r ^ n ^ t
}
var g = function(r, e, o, u, i, c, a) {
    return r = t(r, t(t(f(e, o, u), i), a)),
        t(nn(r, c), e)
}
var f = function(r, n, t) {
    return n ^ (r | ~t)
}
var C = function(r) {
    var n, t = "",
        e = "";
    for (n = 0; n <= 3; n++) t += (e = "0" + (r >>> 8 * n & 255).toString(16)).substr(e.length - 2, 2);
    return t
}
var i = function(r, o, u, f, i, c, a) {
    return r = t(r, t(t(e(o, u, f), i), a)),
        t(nn(r, c), o)
}
var encrypt =  function(r) {
    var n, e, o, u, f, l, s, v, S, m = Array();
    for (r = d(r), m = hh(r), l = 1732584193, s = 4023233417, v = 2562383102, S = 271733878, n = 0; n < m.length; n += 16) e = l,
        o = s,
        u = v,
        f = S,
        l = i(l, s, v, S, m[n + 0], 7, 3614090360),
        S = i(S, l, s, v, m[n + 1], 12, 3905402710),
        v = i(v, S, l, s, m[n + 2], 17, 606105819),
        s = i(s, v, S, l, m[n + 3], 22, 3250441966),
        l = i(l, s, v, S, m[n + 4], 7, 4118548399),
        S = i(S, l, s, v, m[n + 5], 12, 1200080426),
        v = i(v, S, l, s, m[n + 6], 17, 2821735955),
        s = i(s, v, S, l, m[n + 7], 22, 4249261313),
        l = i(l, s, v, S, m[n + 8], 7, 1770035416),
        S = i(S, l, s, v, m[n + 9], 12, 2336552879),
        v = i(v, S, l, s, m[n + 10], 17, 4294925233),
        s = i(s, v, S, l, m[n + 11], 22, 2304563134),
        l = i(l, s, v, S, m[n + 12], 7, 1804603682),
        S = i(S, l, s, v, m[n + 13], 12, 4254626195),
        v = i(v, S, l, s, m[n + 14], 17, 2792965006),
        s = i(s, v, S, l, m[n + 15], 22, 1236535329),
        l = c(l, s, v, S, m[n + 1], 5, 4129170786),
        S = c(S, l, s, v, m[n + 6], 9, 3225465664),
        v = c(v, S, l, s, m[n + 11], 14, 643717713),
        s = c(s, v, S, l, m[n + 0], 20, 3921069994),
        l = c(l, s, v, S, m[n + 5], 5, 3593408605),
        S = c(S, l, s, v, m[n + 10], 9, 38016083),
        v = c(v, S, l, s, m[n + 15], 14, 3634488961),
        s = c(s, v, S, l, m[n + 4], 20, 3889429448),
        l = c(l, s, v, S, m[n + 9], 5, 568446438),
        S = c(S, l, s, v, m[n + 14], 9, 3275163606),
        v = c(v, S, l, s, m[n + 3], 14, 4107603335),
        s = c(s, v, S, l, m[n + 8], 20, 1163531501),
        l = c(l, s, v, S, m[n + 13], 5, 2850285829),
        S = c(S, l, s, v, m[n + 2], 9, 4243563512),
        v = c(v, S, l, s, m[n + 7], 14, 1735328473),
        s = c(s, v, S, l, m[n + 12], 20, 2368359562),
        l = a(l, s, v, S, m[n + 5], 4, 4294588738),
        S = a(S, l, s, v, m[n + 8], 11, 2272392833),
        v = a(v, S, l, s, m[n + 11], 16, 1839030562),
        s = a(s, v, S, l, m[n + 14], 23, 4259657740),
        l = a(l, s, v, S, m[n + 1], 4, 2763975236),
        S = a(S, l, s, v, m[n + 4], 11, 1272893353),
        v = a(v, S, l, s, m[n + 7], 16, 4139469664),
        s = a(s, v, S, l, m[n + 10], 23, 3200236656),
        l = a(l, s, v, S, m[n + 13], 4, 681279174),
        S = a(S, l, s, v, m[n + 0], 11, 3936430074),
        v = a(v, S, l, s, m[n + 3], 16, 3572445317),
        s = a(s, v, S, l, m[n + 6], 23, 76029189),
        l = a(l, s, v, S, m[n + 9], 4, 3654602809),
        S = a(S, l, s, v, m[n + 12], 11, 3873151461),
        v = a(v, S, l, s, m[n + 15], 16, 530742520),
        s = a(s, v, S, l, m[n + 2], 23, 3299628645),
        l = g(l, s, v, S, m[n + 0], 6, 4096336452),
        S = g(S, l, s, v, m[n + 7], 10, 1126891415),
        v = g(v, S, l, s, m[n + 14], 15, 2878612391),
        s = g(s, v, S, l, m[n + 5], 21, 4237533241),
        l = g(l, s, v, S, m[n + 12], 6, 1700485571),
        S = g(S, l, s, v, m[n + 3], 10, 2399980690),
        v = g(v, S, l, s, m[n + 10], 15, 4293915773),
        s = g(s, v, S, l, m[n + 1], 21, 2240044497),
        l = g(l, s, v, S, m[n + 8], 6, 1873313359),
        S = g(S, l, s, v, m[n + 15], 10, 4264355552),
        v = g(v, S, l, s, m[n + 6], 15, 2734768916),
        s = g(s, v, S, l, m[n + 13], 21, 1309151649),
        l = g(l, s, v, S, m[n + 4], 6, 4149444226),
        S = g(S, l, s, v, m[n + 11], 10, 3174756917),
        v = g(v, S, l, s, m[n + 2], 15, 718787259),
        s = g(s, v, S, l, m[n + 9], 21, 3951481745),
        l = t(l, e),
        s = t(s, o),
        v = t(v, u),
        S = t(S, f);
    return (C(l) + C(s) + C(v) + C(S)).toLowerCase()
}
var cert='912101007600936848'
var ts='1522638026757'
var serverRandom= '4155544853455256455248454c4c4f320300240006000000000000000000240081d05e12a3c3143de36ff87c1ce42074da94c15a81d05e12a3c3143de36ff87c1ce42074'

var key = '3d4062d2c80653c8970106bd67b2b86d'
// var key = 'af35b0d348e5162036e183339d385b0c'
//            af35b0d348e5162036e183339d385b0c

console.log(checkTaxno(cert, ts, "", "bsEncode(encrypt(gen(moveTo(a+b),moveTo(xx(c2))))+gen(a,b)+encrypt(xx(''+yy(b)))).toUpperCase() ", serverRandom))
//b5457f5ff13bde41ec4330590eaab13e
