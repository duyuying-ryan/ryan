window.onload = function() {
    const oBanner = document.querySelector(".banner");
    const oUl = document.querySelector(".banner .imgBox");
    const aBtns = document.querySelectorAll(".banner .pointBox li");
    const LeftANDRightBtn = document.querySelectorAll(".leftRightTabs a");
    let iNow = 1; //代表当前显示的图片的下标
    let timer = null;
    let isRunning = false; //代表当前动画是否在执行。

    //一开始就要调用一次
    timerInner();

    //点击按钮的时候，进行小圆点切换和轮播图的切换
    for (var i = 0; i < aBtns.length; i++) {
        aBtns[i].index = i;
        aBtns[i].onclick = function() {
            iNow = this.index + 1;
            tab();
        };
    }

    //自动轮播
    function timerInner() {
        timer = setInterval(function() {
            iNow++;
            tab();
        }, 2000);
    }

    //实现轮播效果
    function tab() {

        console.log(iNow);
        for (var i = 0; i < aBtns.length; i++) {
            aBtns[i].className = "";
        }
        if (iNow == aBtns.length + 1) {
            aBtns[0].className = "active";
        } else if (iNow == 0) {
            aBtns[aBtns.length - 1].className = "active";
        } else {
            aBtns[iNow - 1].className = "active";
        }

        //开始动画
        isRunning = true;
        startMove(oUl, { left: iNow * -600 }, function() {
            //判断最后一张图片结束的时候
            if (iNow == aBtns.length + 1) {
                iNow = 1;
                oUl.style.left = "-600px";

                //判断第一张图片的时候
            } else if (iNow == 0) {
                iNow = 5;
                oUl.style.left = iNow * -600 + "px";
            }
            //这里动画结束
            isRunning = false;
        });
    }

    //给banner添加鼠标的移入和移出
    oBanner.onmouseenter = function() {
        clearInterval(timer);
    };
    oBanner.onmouseleave = function() {
        //重新启动动画
        timerInner();
    };

    //添加左右按钮的点击
    LeftANDRightBtn[0].onclick = function() {
        if (!isRunning) {
            iNow--;
            tab();
        }
        return false;
    };

    LeftANDRightBtn[1].onclick = function() {
        if (!isRunning) {
            iNow++;
            tab();
        }
        return false;
    };

    //【注】这里的防抖时间，要大于动画的执行时间。
};