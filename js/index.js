(function () {

    //公共变量
    let num = 5 * 5 * 5;
    let oUl = document.querySelector("#main ul.list");

    //初始布局
    (function () {
        let html = "";
        for (let i = 0; i < num; i++) {

            //设定li的初始位置
            let ranX = Math.floor(Math.random() * 6000 - 3000);
            let ranY = Math.floor(Math.random() * 6000 - 3000);
            let ranZ = Math.floor(Math.random() * 10000 - 5000);

            let picNum = i % 29
            picNum = picNum === 0 ? picNum + 1 : picNum
            //创建li标签
            html += `<li style="transform: translate3D(${ranX}px,${ranY}px,${ranZ}px)">
                <img src = "img/${picNum}.png" alt="" style="filter: alpha(opacity=50)"/>
<!--                <div class="alpha"></div>-->
            </li>`;
        }
        oUl.innerHTML = html;

        //重绘页面
        oUl.offsetLeft;

        //将布局变为Grid布局
        oUl.className = "list Helix";
    })();


    //效果css提前载入
    (function () {
        let css = "";
        let oCss = document.getElementById("css");
        let aLi = oUl.children;
        //遍历计算样式
        [...aLi].forEach((ele, i) => {
            //Helix的css样式提前加入
            (function () {
                let rad = 4;
                let trX = 0;
                let trY = (i - num / 2) * 4 * rad;
                let trZ = 1500;
                let roY = i * (rad * 360) / num;
                css += `#main ul.list.Helix li:nth-child(${i + 1}){transform:rotateY(${roY}deg) translate3D(${trX}px,${trY}px,${trZ}px) !important;}`;
            })();
        });
        //赋值
        oCss.innerHTML = css;
    })();

    function rotate() {

    }

    (function () {
        let lastX
            , lastY
            , nX
            , nY
            , x_ = 0
            , y_ = 0
            , timer;

        let roX = 0
            , roY = 0
            , trZ = -2450;

        //给document加拖拽事件
        document.onmousedown = function (e) {

            //停止可能还没有结束的惯性动画
            cancelAnimationFrame(timer);

            //获取鼠标的初始位置
            lastX = e.clientX;
            lastY = e.clientY;

            /*//获取元素初始位置
            let sRoY = roY;
            let sRoX = roX;*/

            this.onmousemove = function (e) {

                //当前点的位置
                nX = e.clientX;
                nY = e.clientY;

                //计算当前位置，和前一次的位置之间的变化量
                x_ = nX - lastX;
                y_ = nY - lastY;

                //得到元素位置变化之后的值
                /*roY = sRoY + x_*0.2;
                roX = sRoX - y_*0.2;*/
                roY += x_ * 0.15;
                roX -= y_ * 0.15;
                lastX = nX;
                lastY = nY;

                //添加到样式中
                oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;
            };
        };
        document.onmouseup = function () {
            this.onmousemove = null;

            //惯性
            !function m() {
                x_ *= 0.95;
                y_ *= 0.95;

                if (Math.abs(x_) <= 0.5) {
                    x_ = 0;
                }
                if (Math.abs(y_) <= 0.5) {
                    y_ = 0;
                }

                roY += x_ * 0.1;
                roX -= y_ * 0.1;

                oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;

                if (!x_ && !y_) return;
                timer = requestAnimationFrame(m);
            }();

        };
        //添加滚轮事件
        mousewheel(document, function (e, d) {

            //得到样式最终的值
            trZ += d * 150;

            trZ = Math.min(trZ, 2200);
            trZ = Math.max(trZ, -10000);

            //设置css
            oUl.style.transform = `translateZ(${trZ}px) rotateX(${roX}deg) rotateY(${roY}deg)`;

            /*if ( d < 0 ){
                //向下拉
                trZ -= -d*200;
            } else{
                //向上推
                trZ += d*200;
            }*/

        });
    })();
})();