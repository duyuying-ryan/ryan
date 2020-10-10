import { ajax } from 'ajax';

// 邮件输入框
var oEmail = document.getElementById("email");
// 邮件输入框提示
var oEmail_span = document.getElementById("email_span");
//密码输入框
var oPsd = document.getElementById("psd");
//密码输入框提示
var oPsd_span = document.getElementById("psd_span");

//号码输入框
var oNum = document.getElementById("num");
//号码输入框提示
var oNum_span = document.getElementById("num_span");

var oReg = document.getElementById("reg");
var oReg_span = document.getElementById("reg_span");







// //获取焦点 foucs 事件
oEmail.onfocus = function() {
    //javascript 设置某一个标签的样式，使用 style.xxx 形式设置
    oEmail_span.style.display = "block";
    oEmail_span.style.color = "grey";
    oEmail_span.innerHTML =
        "6～18个字符，可使用字母、数字、下划线，需要以字母开头";
};

//获取焦点 foucs 事件
oPsd.onfocus = function() {
    //javascript 设置某一个标签的样式，使用 style.xxx 形式设置
    oPsd_span.style.display = "block";
    oPsd_span.style.color = "grey";
    oPsd_span.innerHTML =
        "6~16个字符，区分大小写";
};

// //获取焦点 foucs 事件
oNum.onfocus = function() {
    //javascript 设置某一个标签的样式，使用 style.xxx 形式设置
    oNum_span.style.display = "block";
    oNum_span.style.color = "grey";
    oNum_span.innerHTML =
        "可通过该手机号找回密码";
};



//失去焦点 blur  事件
oNum.onblur = function() {
    // console.log("失去焦点");
    //1、拿到输入框的内容
    var oValue = oNum.value;
    if (!oValue) {
        oNum_span.style.display = "none";
    } else {
        //判断已经输入的内容是否为正确的用户名
        //2、判断长度是否符合条件
        if (!isPhoneNumber(oValue)) {
            oNum_span.innerHTML = "!请填写正确的中国大陆地区手机号，其他地区手机号请点击此处";
            oNum_span.style.display = "block";
            oNum_span.style.color = "red";
        } else {
            oNum_span.style.display = "none";
        }
    }
};




// function Onfocus() {
//     //javascript 设置某一个标签的样式，使用 style.xxx 形式设置
//     oEmail_span.style.display = "block";
//     oEmail_span.style.color = "grey";
//     oEmail_span.innerHTML =
//         "6～18个字符，可使用字母、数字、下划线，需要以字母开头";
// }

// oEmail.onfocus = Onfocus;
// oPsd.onfocus = Onfocus;
oPsd.onblur = function() {
    // console.log("失去焦点");
    //1、拿到输入框的内容
    var oValue = oPsd.value;
    if (!oValue) {
        oPsd_span.style.display = "none";
    } else {
        //判断已经输入的内容是否为正确的用户名
        //2、判断长度是否符合条件
        if (oValue.length > 16 || oValue.length < 6) {
            oPsd_span.innerHTML = "!密码长度应为6～16个字符";
            oPsd_span.style.display = "block";
            oPsd_span.style.color = "red";
        } else {
            oPsd_span.style.display = "none";
        }
    }
};



//失去焦点 blur  事件
oEmail.onblur = function() {
    // console.log("失去焦点");
    //1、拿到输入框的内容
    var oValue = oEmail.value;
    if (!oValue) {
        oEmail_span.style.display = "none";
    } else {
        //判断已经输入的内容是否为正确的用户名
        //2、判断长度是否符合条件
        if (oValue.length > 18 || oValue.length < 6) {
            oEmail_span.innerHTML = "!长度应为6～18个字符";
            oEmail_span.style.display = "block";
            oEmail_span.style.color = "red";
        } else if (/[^a-zA-Z]/.test(oValue[0])) {
            //3、判断首字符是否是字母
            oEmail_span.innerHTML = "!邮箱地址需以字母开头";
            oEmail_span.style.display = "block";
            oEmail_span.style.color = "red";
        } else if (/\W/.test(oValue)) {
            //符合条件
            oEmail_span.innerHTML = "!只能输入字母、数字、下划线";
            oEmail_span.style.display = "block";
            oEmail_span.style.color = "red";
        } else {
            oEmail_span.innerHTML = "✅恭喜，该邮件地址可以注册";
            oEmail_span.style.display = "block";
            oEmail_span.style.color = "green";
        }
    }
};

// 

function isPhoneNumber(phonerNumber) {
    // TODO 判断是否为手机号
    // return /\d{3}-\d{8}|\d{4}-\{7,8}/.test(phonerNumber);
    var parr = /0?(13|14|15|17|18|19)[0-9]{9}/
    var result = parr.test(phonerNumber);
    return result;
}

oReg.onmousedown = function() {
    alert("执行");
    var username = oEmail.value; // 用户名
    var password = oPsd.value; // 密码
    var data = "usr=" + username + "&" + "psd=" + password;
    ajax({
        type: "post",
        url: "http://localhost/register.php",
        data: data,
        success: refSuccess,
        error: regError
    });
}

function refSuccess(data) {
    alert(data);
    var obj = JSON.parse(data);
    if (obj.result == "success") {
        // TODO
        window.location = "index.html";
    } else {
        // TODO
        alert("注册失败");
    }
}

function regError(data) {
    alert("注册请求失败");
}