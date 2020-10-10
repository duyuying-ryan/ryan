function sortBubble(arr) {
  //arr = arr
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
}

//阻止a链接的默认行为，有跨浏览器兼容
function preDef(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    window.event.returnValue = false;
  }
}

function changeSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    //被比较的数
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
}

//跨浏览器兼容的阻止事件冒泡的函数
function stopBubble(e){
  if(e.stopPropagation){
    e.stopPropagation();
  }else{
    e.cancelBubble = true;
  }
}

function randomColor() {
  var str =
    "rgba(" +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 256) +
    ",1)";
  return str;
}
//判断单个字符是否是字母
function isABC(charStr) {
  if (
    (charStr >= "a" && charStr <= "z") ||
    (charStr >= "A" && charStr <= "Z")
  ) {
    return true;
  } else {
    return false;
  }
}
//判断单个字符是否是数字、字母和下划线
function isDEF(charStr) {
  if (
    (charStr >= "a" && charStr <= "z") ||
    (charStr >= "A" && charStr <= "Z") ||
    (charStr >= "0" && charStr <= "9") ||
    charStr == "_"
  ) {
    return true;
  } else {
    return false;
  }
}
function showTime() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();

  var week = d.getDay();
  week = numberOfChinese(week);

  var hour = doubleNum(d.getHours());
  var min = doubleNum(d.getMinutes());
  var sec = doubleNum(d.getSeconds());

  return (
    year +
    "年" +
    month +
    "月" +
    date +
    "日 星期" +
    week +
    " " +
    hour +
    ":" +
    min +
    ":" +
    sec
  );
}

function numberOfChinese(n) {
  //n星期  0-6  0周日
  var arr = ["日", "一", "二", "三", "四", "五", "六"];
  return arr[n];
}

//单位数变双位数
function doubleNum(n) {
  if (n < 10) {
    return "0" + n;
  } else {
    return n;
  }
}

//封装一个跨浏览器兼容的获取当前有效样式的函数
function getStyle(node, cssStyle) {
  return node.currentStyle
    ? node.currentStyle[cssStyle]
    : getComputedStyle(node)[cssStyle];
}

function drag(node) {
  //添加鼠标按下
  node.onmousedown = function (ev) {
    var e = ev || window.event;
    //记录相对位置
    var offsetX = e.clientX - node.offsetLeft;
    var offsetY = e.clientY - node.offsetTop;

    //添加鼠标拖拽
    document.onmousemove = function (ev) {
      var e = ev || window.event;
      //改变当前被拖拽的位置
      node.style.left = e.clientX - offsetX + "px";
      node.style.top = e.clientY - offsetY + "px";
    };
  };
  document.onmouseup = function () {
    document.onmousemove = null;
  };
}

function limitDrag(node){
  //添加鼠标按下
  node.onmousedown = function(ev){
    var e = ev || window.event;
    //记录相对位置
    var offsetX = e.clientX - node.offsetLeft;
    var offsetY = e.clientY - node.offsetTop;

    //添加鼠标拖拽
    document.onmousemove = function(ev){
      var e = ev || window.event;
      //改变当前被拖拽的位置
      var l = e.clientX - offsetX;
      var t = e.clientY - offsetY;
      if(l <= 0){
        l = 0;
      }
      var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
      if(l >= windowWidth - node.offsetWidth){
        l = windowWidth - node.offsetWidth;
      }

      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      t = Math.max(0, t);
      t = Math.min(windowHeight - node.offsetHeight, t)

      node.style.left = l + 'px';
      node.style.top = t + 'px';
    }
  }
  document.onmouseup = function(){
    document.onmousemove = null;
  }
}
