$("#pageshow").show();
var ymbb = "3.0.13";

var count = 1;
var cert = "";

$('#version').text(VERSION);
$('.city_name').text(getCityName());

$('#password1').focus(function() {
    var value = $(this).val();
    var defaultValue = "输入税控盘/金税盘证书密码";
    if (value == defaultValue) {
        $('#login_pass1').hide();
        $('#login_pass').show();
        $('#password').focus();
    }
});

$("#password").blur(function() {
    var password = $("#password").val().trim();
    if (password == "") {
        $('#login_pass1').show();
        $('#login_pass').hide();
    }
});

$('.theme-poptit .close').click(function() {
    $('.theme-popover-mask').fadeOut(100);
    $('.theme-popover').slideUp(200);
});

var thickPass = "1234567890,111111111111111111111111,222222222222222222222222,333333333333333333333333,444444444444444444444444,555555555555555555555555,666666666666666666666666,777777777777777777777777,888888888888888888888888,999999999999999999999999,000000000000000000000000";
var aa = false;
function countSl() {
    aa = document.getElementById("mmtx1").checked;
}
$('#submit').click(function() {
    if (validateCertPass("password")) {
        var certPass = $('#password').val();
        var ptPassword = $('#password2').val();
        Login(certPass, ptPassword);
        //    if(certPass!=undefined&&certPass!=null){
        //      if(getCookie("mmtx")!='@#$%!@#'){
        //        if(thickPass.indexOf(certPass)>=0){
        //          jAlert("<div id='popup_message'>系统检测到您当前使用的证书密码过于简单，为保障信息安全，建议您及时修改证书密码！<br><br><input id='mmtx1' onclick='countSl();' type='checkbox'>&nbsp;&nbsp;下次不再提醒我</div>","提示",function(r) {
        //            if(r){
        //              if(aa){
        //                setCookie("mmtx","@#$%!@#",10*24*60*60*1000);
        //              }
        //              Login(certPass,ptPassword);
        //            }
        //          });
        //        }else{
        //          Login(certPass,ptPassword);
        //        }
        //      }else{
        //        Login(certPass,ptPassword);
        //      }
        //    }
    }
});

function opengg() {
    $("#jqgg").show();
    $("#opengg").hide();
    $("#closegg").show();
}
function closegg() {
    $("#jqgg").hide();
    $("#opengg").show();
    $("#closegg").hide();
}

function validateCertPass(passId) {
    var password = $('#' + passId).val();
    if (password == "") {
        jAlert("<div id='popup_message'>请输入税控盘/金税盘证书密码!</div>", "提示信息");
        return false;
    }
    return true;
}

function validatePtPass() {
    var ptPassword = $('#password2').val();
    if (ptPassword == "") {
        jAlert("<div id='popup_message'>请输入平台密码!</div>", "提示信息");
        return false;
    }
    if (ptPassword.length < 6 || ptPassword.length > 20 || checkPass(ptPassword) < 2) {
        jAlert("<div id='popup_message'>平台密码不正确!</div>", "提示信息");
        return false;
    }
    return true;
}

function validateLogin(certPass) {

    $('.theme-popover-mask').fadeIn(100);
    $('.theme-popover').slideDown(200);

    $('.theme-popbod').empty();

    count = 1;
    $('.theme-popbod').append('<span>' + count + '、当前浏览器为：<strong style="color:green;">' + getWebVersion() + '</strong></span><br/>');
    count++;

    //检测安全控件是否加载成功
    if (document.all.CryptCtrl.object == null) {
        $('.theme-popbod').append('<span>' + count + '、当前浏览器加载安全控件：</span><strong style="color:red;">不成功</strong><br/>');
        count++;
        return false;
    } else {
        $('.theme-popbod').append('<span>' + count + '、当前浏览器加载安全控件：</span><strong style="color:green;">成功</strong><br/>');
        count++;
    }

    //检测是否能够成功获取纳税人识别号
    var rtn = openThisDevice(certPass);
    if (rtn != 0) {
        return false;
    }

    $('.theme-popbod').append('<span>' + count + '、客户端证书密码：</span></span><strong style="color:green;">正确</strong><br/>');
    count++;

    cert = getThisCert();
    var strRegx = /^[0-9a-zA-Z]+$/;
    if (cert == "") {
        $('.theme-popbod').append('<span>' + count + '、读取证书信息失败，未获取到合法的纳税人信息,请重新提交请求或检查金税盘/税控盘是否插入！</span><br/>');
        count++;
        return false;
    } else if (!strRegx.test(cert)) {
        $('.theme-popbod').append('<span>' + count + '、读取到的纳税人信息（纳税人识别号：' + cert + '）不合法！请重试！</span><br/>');
        count++;
        return false;
    } else {
        $('.theme-popbod').append('<span>' + count + '、读取到的纳税人识别号：<strong style="color:green;">' + cert + '</strong></span><br/>');
        count++;
    }
    return true;
}

function Login(certPass, ptPassword) {

    if (!validateLogin(certPass)) {
        return;
    }

    var rtn = openThisDevice(certPass);
    if (rtn != 0) {
        return false;
    }

    rtn = MakeClientHello();
    if (rtn != 0) {
        return;
    }
    var clientHello = CryptCtrl.strResult;
    var param1 = {
        "type": "CLIENT-HELLO",
        "clientHello": clientHello,
        "ymbb": ymbb
    };

    $('#submit').hide();
    $('#unsubmit').show();

    $('.theme-popbod').append('<span>' + count + '、开始调用外网服务，正在进入......</span><br/>');
    count++;

    firstLogin(param1, ptPassword,
    function(data, info) {
        firstLogin(param1, ptPassword,
        function(data, info) {
            firstLogin(param1, ptPassword,
            function(data, info) {
                if (data == "00") {
                    jAlert_mail("<div id='popup_message'><br/>服务器调用身份认证失败！" + info + "<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "服务器调用身份认证失败！");
                } else if (data.responseText == "" || data.responseText == undefined) {
                    jAlert_mail("<div id='popup_message'><br/>网络异常！<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "网络异常！");
                } else {
                    jAlert_mail("<div id='popup_message'>系统异常！统一受理系统报文为:" + data.responseText + "</div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "统一受理异常，报文为：" + getTyslInfo(data.responseText));
                }
                $('.theme-poptit .close').trigger('click');
                $('#unsubmit').hide();
                $('#submit').show();
            });
        });
    });
}

function firstLogin(param1, ptPassword, cb) {
    $.ajax({
        type: "post",
        url: IP + "/SbsqWW/login.do",
        data: param1,
        timeout: TIMEOUT,
        dataType: "jsonp",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        jsonp: "callback",
        success: function(jsonData) {
            $('.theme-popbod').append('<span>' + count + '、首次访问外网服务：<strong style="color:green;">正常</strong></span><br/>');
            count++;
            var key1 = jsonData.key1;

            if (key1 == "00") {

                jAlert("<div id='popup_message'>服务器调用身份认证失败！" + jsonData.key2 + " 正在重试......</div>", "提示");
                cb("00", jsonData.key2);
            } else if (key1 == "01") {
                serverPacket = jsonData.key2;
                serverRandom = jsonData.key3;
                rtn = MakeClientAuthCode();
                $('.theme-popbod').append('<span>' + count + '、第二次访问外网服务：请稍候......</span><br/>');
                count++;

                var cert = getThisCert();
                if (!velidateNsrsbh(cert)) {
                    return;
                }

                $.ajax({
                    url: IP + "/SbsqWW/querymm.do",
                    type: 'post',
                    data: {
                        "cert": cert,
                        "funType": "01"
                    },
                    dataType: "jsonp",
                    timeout: TIMEOUT,
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    jsonp: "callback",
                    success: function(data) {
                        var page = data['page'];
                        var ts = data['ts'];
                        var publickey = '';
                        if (page != '') {
                            publickey = $.checkTaxno(cert, ts, '', page, serverRandom);
                        }

                        var param2 = {};
                        if (param1.mmtype == "1") {
                            param2 = {
                                "type": "CLIENT-AUTH",
                                "clientAuthCode": clientAuthCode,
                                "serverRandom": serverRandom,
                                "password": ptPassword,
                                "cert": cert,
                                "ymbb": ymbb,
                                "ts": ts,
                                "publickey": publickey,
                                "mmtype": "1"
                            };
                        } else if (param1.mmtype == "2") {
                            param2 = {
                                "type": "CLIENT-AUTH",
                                "clientAuthCode": clientAuthCode,
                                "serverRandom": serverRandom,
                                "password": ptPassword,
                                "cert": cert,
                                "ymbb": ymbb,
                                "ts": ts,
                                "publickey": publickey,
                                "mmtype": "2",
                                "answer": param1.answer
                            };
                        } else {
                            param2 = {
                                "type": "CLIENT-AUTH",
                                "clientAuthCode": clientAuthCode,
                                "serverRandom": serverRandom,
                                "password": ptPassword,
                                "ts": ts,
                                "publickey": publickey,
                                "cert": cert,
                                "ymbb": ymbb
                            };
                        }

                        secondLogin(param2,
                        function(data, info) {
                            secondLogin(param2,
                            function(data, info) {
                                secondLogin(param2,
                                function(data, info) {
                                    if (data == "00") {
                                        jAlert_mail("<div id='popup_message'><br/>登录失败！<br/>" + info + "</div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "登录失败！" + info);
                                    } else if (data.responseText == "" || data.responseText == undefined) {
                                        jAlert_mail("<div id='popup_message'><br/>网络异常！<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "网络异常！");
                                    } else {
                                        jAlert_mail("<div id='popup_message'>网络异常:" + data.responseText + "</div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "网络异常:" + getTyslInfo(data.responseText));
                                    }
                                    $('.theme-poptit .close').trigger('click');
                                    $('#unsubmit').hide();
                                    $('#submit').show();
                                });
                            });
                        });

                    },
                    error: function(xhr) {
                        jAlert("<div id='popup_message'>网络异常，正在重试......</div>", "提示");
                    }
                });

            } else {
                jAlert_error("<div id='popup_message'>系统异常，错误代码为:" + key1 + "</div>", "提示");
            }
            $('.theme-poptit .close').trigger('click');
            $('#unsubmit').hide();
            $('#submit').show();
        },
        error: function(data) {
            if (data.responseText == "" || data.responseText == undefined) {
                jAlert("<div id='popup_message'>网络异常，正在重试......</div>", "提示");
            } else {
                jAlert("<div id='popup_message'>系统异常，正在重试......，统一受理系统报文为:" + data.responseText + "</div>", "提示");
            }
            cb(data);
        }

    });
}

function secondLogin(param2, cb) {
    $.ajax({
        type: "post",
        url: IP + "/SbsqWW/login.do",
        data: param2,
        dataType: "jsonp",
        timeout: TIMEOUT,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        jsonp: "callback",
        success: function(backData) {

            var rezt = backData.key1;
            if (param2.mmtype == "2") {
                var key1 = backData.key1;
                if (key1 == "00") {
                    jAlert("<div id='popup_message'>答案错误！</div>", "提示");
                    return;
                } else if (key1 == "01") {
                    var token = backData.key2;
                    clearCookie("token");
                    setCookie("token", token, seconds);
                    jAlert("<div id='popup_message'>平台密码已成功取消，如需要，请登录平台后重新设置平台密码！</div>", "提示",
                    function(r) {
                        window.location.href = getDomainName();
                    });

                } else if (key1 == '09') {
                    jAlert("<div id='popup_message'>会话已超时，请重新登陆！</div>", "提示",
                    function(r) {
                        if (r) {
                            window.location.href = getDomainName();
                        }
                    });
                } else {
                    jAlert_error("<div id='popup_message'>系统异常，错误代码为:" + key1 + "</div>", "提示");
                }

                $('.theme-poptit2 .close').trigger('click');
            }
            if (rezt == "00") {
                jAlert("<div id='popup_message'>登录失败！" + backData.key2 + " 正在重试......</div>", "提示");
                cb("00", backData.key2);
            } else if (rezt == "01") {
                if (param2.mmtype = "1") {
                    var key1 = backData.key1;
                    if (key1 == "00") {
                        jAlert_error("<div id='popup_message'>数据库异常！</div>", "提示");
                        return;
                    } else if (key1 == "01") {
                        var token = backData.key3;

                        clearCookie("token");
                        setCookie("token", token, seconds);

                        $('#question').val(decodeURI(backData.key2, "UTF-8"));

                    } else if (key1 == '09') {
                        jAlert("<div id='popup_message'>会话已超时，请重新登陆！</div>", "提示",
                        function(r) {
                            if (r) {
                                window.location.href = getDomainName();
                            }
                        });
                    } else {
                        jAlert_error("<div id='popup_message'>系统异常，错误代码为:" + key1 + "</div>", "提示");
                    }
                } else {
                    var nsrmc = decodeURI(backData.key3, "UTF-8");
                    var dqrq = backData.key4;
                    if (dqrq == "") {
                        dqrq = getDqrq();
                    }
                    setCookie("dqrq", dqrq, seconds);
                    setCookie("nsrmc", nsrmc, seconds);
                    clearCookie("token");
                    setCookie("token", backData.key2, seconds);

                    window.location.href = "config.0eb91445.html";
                }
            } else if (rezt == "02") {
                var nsrsbh = backData.key2;
                jAlert("<div id='popup_message'>纳税人档案（税号：" + nsrsbh + "）信息不存在！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，则请联系主管税务机关进行核实和补录相关档案信息！</div>", "提示");
            } else if (rezt == "12") { //添加档案更新日志
                clearCookie("token");
                setCookie("token", backData.key2, seconds);
                var nsrsbh = backData.key3;
                var xyjb = backData.key5;
                if (xyjb == "" || xyjb == "null") {
                    xyjb = "未设置"
                }
                jAlert("<div id='popup_message'>纳税人档案信息为（税号：" + nsrsbh + "；信用等级：" + xyjb + "）！<br/>请确认本企业是否属于取消认证政策的纳税人。<br/>如是，则请联系主管税务机关进行核实和修改相关档案信息！</div>", "提示");
            } else if (rezt == "13") {
                var nsrsbh = backData.key2;
                jAlert("<div id='popup_message'>纳税人档案信息为（税号：" + nsrsbh + "）为特定企业！<br/>特定企业不允许进行网上发票认证！<br/>如有疑问，请联系主管税务机关进行核实和修改相关档案信息！</div>", "提示");
            } else if (rezt == "03") {
                var token = backData.key2;
                var nsrmc = decodeURI(backData.key3, "UTF-8");
                var dqrq = backData.key4;
                setCookie("dqrq", dqrq, seconds);
                setCookie("nsrmc", nsrmc, seconds);
                setCookie("token", token, seconds);
                var tokens = token.split(MENUSPLIT);
                if (tokens != undefined && tokens != null && tokens.length == 9) {
                    if (tokens[5] == '1') { //小规模企业
                        if (tokens[2] == '1') { //经销企业
                            window.location.href = "fpgjsjxz.b6ce7188.html";
                        } else if (tokens[2] == '2') { //生产企业
                            window.location.href = "xfsgzt.c89e3398.html";
                        } else {
                            window.location.href = "index.html";
                        }
                    } else { //一般人
                        window.location.href = "main.14b76b14.html";
                    }
                } else {
                    window.location.href = "main.14b76b14.html";
                }

            } else if (rezt == "04") {
                var token = backData.key2;
                setCookie("token", token, seconds);
                jAlert("<div id='popup_message'>平台密码不正确！</div>", "提示");
            } else if (rezt == "05") {
                var token = backData.key2;
                setCookie("token", token, seconds);
                jAlert("<div id='popup_message'>平台密码错误次数超过十次，请联系税务机关解锁或明天再试！</div>", "提示");
            } else if (rezt == "08") {
                $('#ptmm').show();
                $('#ptmmTs').show();
            } else if (rezt == "21") { //添加档案更新日志
                clearCookie("token");
                setCookie("token", backData.key2, seconds) var xyjb = backData.key4;
                if (xyjb == "" || xyjb == "null") {
                    xyjb = "未设置"
                }
                jAlert("<div id='popup_message'>纳税人档案信息为(税号：" + backData.key3 + ")档案信息存在，当前信用级别为：" + xyjb + ",本平台启用状态为：未启用,无权登录此系统，请联系主管税务机关开通权限！</div>", "提示");
            } else if (rezt == "22") {
                jAlert_error("<div id='popup_message'>初始化期初数据出现数据库异常，请重新登录！</div>", "提示");
            } else if (rezt == "23") {
                jAlert_error("<div id='popup_message'>初始化期初数据出现内存数据库异常，请重新登录！</div>", "提示");
            } else if (rezt == "98") {
                jAlert_error("<div id='popup_message'>网络调用异常，请重新登录！</div>", "提示");
            } else if (rezt == "99") {
                jAlert_error("<div id='popup_message'>网络调用超时，请重新登录！</div>", "提示");
            } else if (rezt == "101") {
                jAlert_error("<div id='popup_message'>数据库连接失败,请重新登录！</div>", "提示");
            } else {
                jAlert_error("<div id='popup_message'>系统异常，错误代码为:" + rezt + "</div>", "提示");
            }
            $('.theme-poptit .close').trigger('click');
            $('#unsubmit').hide();
            $('#submit').show();
        },
        error: function(data) {
            if (data.responseText == "" || data.responseText == undefined) {
                jAlert("<div id='popup_message'>网络异常，正在重试......</div>", "提示");
            } else {
                jAlert("<div id='popup_message'>网络异常，正在重试......,统一受理系统报文为:" + data.responseText + "</div>", "提示");
            }
            cb(data);
        }
    });
}

function openThisDevice(userPin) {
    var err = 0;
    setDeviceParam(userPin);
    if (CryptCtrl.IsDeviceOpened() != 0) {
        CryptCtrl.CloseDevice();
    }
    CryptCtrl.OpenDeviceEx(userPasswd);
    if (CryptCtrl.ErrCode == 0x57) {
        CryptCtrl.OpenDeviceEx(userPasswd);
    }
    if (CryptCtrl.ErrCode != 0 && CryptCtrl.ErrCode != -1) {
        $('.theme-popbod').append('<span style="color:red;">' + count + '、' + CryptCtrl.ErrMsg + '</span><br/>');
        count++;
        return CryptCtrl.ErrCode;
    }
    devicePort = CryptCtrl.strContainer;
    return CryptCtrl.ErrCode;
}

function MakeClientHello() {
    var vbNullString = "";
    var dwFlag = 0;
    CryptCtrl.ClientHello(dwFlag);
    if (CryptCtrl.ErrCode != 0) {
        $('.theme-popbod').append('<span style="color:red;">' + count + '、' + CryptCtrl.ErrMsg + '</span><br/>');
        count++;
        return CryptCtrl.ErrCode;
    }
    return CryptCtrl.ErrCode;
}

function MakeClientAuthCode() {
    var err = 0;
    err = openThisDevice();
    if (err != 0) return err;
    CryptCtrl.ClientAuth(serverPacket);
    if (CryptCtrl.ErrCode != 0) {
        $('.theme-popbod').append('<span style="color:red;">' + count + '、' + CryptCtrl.ErrMsg + '</span><br/>');
        count++;
        return CryptCtrl.ErrCode;
    }
    clientAuthCode = CryptCtrl.strResult;
    CryptCtrl.CloseDevice();
    return CryptCtrl.ErrCode;
}

function getThisCert() {
    var rtn = openThisDevice();
    var ret = CryptCtrl.GetCertInfo("", 71);
    var error = CryptCtrl.errCode;
    var nsrsbh = "";
    if (error == 0) {
        nsrsbh = CryptCtrl.strResult;
    }
    CryptCtrl.CloseDevice();
    return nsrsbh;
}

$('.for_key_alert').click(function() {
    $('.theme-popover-mask2').fadeIn(100);
    $('.theme-popover2').slideDown(200);
    showMMWT();
});

$('.theme-poptit2 .close').click(function() {
    $('.theme-popover-mask2').fadeOut(100);
    $('.theme-popover2').slideUp(200);
});

$('.theme-poptit3 .close').click(function() {
    $('.theme-popover-mask3').fadeOut(100);
    $('.theme-popover3').slideUp(200);
});

//弹层
$(document).ready(function($) {

    var isRefrash = getCookie("isRefrash");
    if (isRefrash != undefined && isRefrash != null && isRefrash == "Y") {
        setCookie("isRefrash", "N", 1);
        window.location.reload(true);
    }

    if (getCookie("XCSFXS") != '@#$%!@#') {
        $('.theme-popover-mask4').fadeIn(100);
        $('.theme-popover4').slideDown(200);
    }

    $('.theme-gonggao').click(function() {
        $('.theme-popover-mask4').fadeIn(100);
        $('.theme-popover4').slideDown(200);
    });

    $('.theme-poptit4 .close').click(function() {
        $('.theme-popover-mask4').fadeOut(100);
        $('.theme-popover4').slideUp(200);
    });

    $('#okButton').click(function() {
        $('.theme-popover-mask4').fadeOut(100);
        $('.theme-popover4').slideUp(200);
        if ($('#nextSw').is(":checked") == true) {
            setCookie("XCSFXS", "@#$%!@#", 10 * 24 * 60 * 60 * 1000);
        }
    });

    document.onkeydown = function(e) {
        var ev = document.all ? window.event: e;
        if (ev.keyCode == 13) {
            $('#submit').trigger('click');
        }
    }
});

function showMMWT() {
    var cert = getCert();
    if (!velidateNsrsbh(cert)) {
        return;
    }
    var certPass = $('#password').val();
    var rtn = openThisDevice(certPass);
    if (rtn != 0) {
        return false;
    }

    rtn = MakeClientHello();
    if (rtn != 0) {
        return;
    }
    var clientHello = CryptCtrl.strResult;
    var ptPassword = $('#password2').val();
    var param1 = {
        "type": "CLIENT-HELLO",
        "clientHello": clientHello,
        "ymbb": ymbb,
        "mmtype": "1"
    };

    firstLogin(param1, ptPassword,
    function(data, info) {
        if (data == "00") {
            jAlert_mail("<div id='popup_message'><br/>服务器调用身份认证失败！" + info + "<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "服务器调用身份认证失败！");
        } else if (data.responseText == "" || data.responseText == undefined) {
            jAlert_mail("<div id='popup_message'><br/>网络异常！<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "网络异常！");
        } else {
            jAlert_mail("<div id='popup_message'>系统异常！统一受理系统报文为:" + data.responseText + "</div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "统一受理异常，报文为：" + getTyslInfo(data.responseText));
        }
        $('.theme-poptit .close').trigger('click');
        $('#unsubmit').hide();
        $('#submit').show();
    });
}

$('#confirm').click(function() {

    if ($('#answer').val() != "") {
        var answer = encodeURI($('#answer').val(), "UTF-8");
        var cert = getCert();
        if (!velidateNsrsbh(cert)) {
            return;
        }
        var certPass = $('#password').val();
        var rtn = openThisDevice(certPass);
        if (rtn != 0) {
            return false;
        }

        rtn = MakeClientHello();
        if (rtn != 0) {
            return;
        }
        var clientHello = CryptCtrl.strResult;
        var ptPassword = $('#password2').val();
        var param1 = {
            "type": "CLIENT-HELLO",
            "clientHello": clientHello,
            "ymbb": ymbb,
            "mmtype": "2",
            "answer": answer
        };

        firstLogin(param1, ptPassword,
        function(data, info) {
            if (data == "00") {
                jAlert_mail("<div id='popup_message'><br/>服务器调用身份认证失败！" + info + "<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "服务器调用身份认证失败！");
            } else if (data.responseText == "" || data.responseText == undefined) {
                jAlert_mail("<div id='popup_message'><br/>网络异常！<br/></div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "网络异常！");
            } else {
                jAlert_mail("<div id='popup_message'>系统异常！统一受理系统报文为:" + data.responseText + "</div>", "提示", PROVINCE + "(纳税人识别号：" + cert + ")登录失败", "统一受理异常，报文为：" + getTyslInfo(data.responseText));
            }
            $('.theme-poptit .close').trigger('click');
            $('#unsubmit').hide();
            $('#submit').show();
        });
    }
});