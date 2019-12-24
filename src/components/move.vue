<template>
    <div>
            <ul id="box">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
    </div>
</template>

<style lang="">
     body,ul,li{margin:0;padding:0;}
ul{list-style: none;}
body{font:13px/1.5 Tahoma;}
#box{position:relative;width:435px;height:580px;margin:10px auto;padding: 10px 5px 10px 10px;border: 1px solid #ccc;}
#box li{float:left;width:80px;height:188px;overflow:hidden;background: #ccc;border: 1px solid #999;}
#box li.hig{width:78px;height:186px;overflow:hidden;border:2px dashed blue;} 
</style>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        move () {
                    
                    var oBox = document.getElementById("box");
                    var aLi = oBox.getElementsByTagName("li");
                    var aPos = [];
                    var aData = [];
                    var zIndex = 1;
                
                    for (var i = 0; i < aLi.length; i++) {
                        aPos[i] = { left: aLi[i].offsetLeft, top: aLi[i].offsetTop };
                    }
			
            //布局转换必须要两个for循环才能完成
                    for (var i = 0; i < aLi.length; i++) {
                        //为每个图片位置赋值
                        aLi[i].style.left = aPos[i].left + 'px';
                        aLi[i].style.top = aPos[i].top + 'px';
        
                        //转换定位
                        aLi[i].style.position = 'absolute';
                        //offset的值经已经包括的margin值，所以要取消
                        aLi[i].style.margin = '0';
        
                        aLi[i].index = i;
                        drag(aLi[i])
                    }
                    
                    //拖拽函数
                    function drag(obj, handle) {
                        var handle = handle || obj;
                        handle.style.cursor = "move";
                        handle.onmousedown = function(event) {
                        var event = event || window.event;
                        var disX = event.clientX - this.offsetLeft;
                        var disY = event.clientY - this.offsetTop;
                        var oNear = null;
                        obj.style.zIndex = zIndex++;
                        document.onmousemove = function(event) {
                            var event = event || window.event;
                            var iL = event.clientX - disX;
                            var iT = event.clientY - disY;
                            var maxL = obj.parentNode.clientWidth - obj.offsetWidth;
                            var maxT = obj.parentNode.clientHeight - obj.offsetHeight;
                    
                            iL < 0 && (iL = 0);
                            iT < 0 && (iT = 0);
                            iL > maxL && (iL = maxL);
                            iT > maxT && (iT = maxT);
                            obj.style.left = iL + "px";
                            obj.style.top = iT + "px";
                    
                            for (i = 0; i < aLi.length; i++) aLi[i].className = "";
                    
                            oNear = findNearest(obj);
                    
                            // oNear && (oNear.className = "hig");
                    
                            return false
                        };
                        document.onmouseup = function() {
                            document.onmousemove = null;
                            document.onmouseup = null;
                            if (oNear) {
                            var tIndex = obj.index;
                            obj.index = oNear.index;
                            oNear.index = tIndex;
                            startMove(obj, aPos[obj.index]);
                            startMove(oNear, aPos[oNear.index], function() {
                                
                            });
                            oNear.className = "";
                            } else {
                            startMove(obj, aPos[obj.index])
                            }
                            handle.releaseCapture && handle.releaseCapture()
                        };
                        this.setCapture && this.setCapture();
                        return false
                        }
                    }
                    
                    //找出相遇点中最近的元素
                    function findNearest(obj) {
                        var filterLi = [];
                        var aDistance = [];
                    
                        for (i = 0; i < aLi.length; i++) aLi[i] != obj && (isButt(obj, aLi[i]) && (aDistance.push(getDistance(obj, aLi[i])), filterLi.push(aLi[i])));
                    
                        var minNum = Number.MAX_VALUE;
                        var minLi = null;
                    
                        for (i = 0; i < aDistance.length; i++) aDistance[i] < minNum && (minNum = aDistance[i], minLi = filterLi[i]);
                    
                        return minLi
                    }
                    
                    
                    
                    //求两点之间的距离
                function getDistance(obj1, obj2) {
                    var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
                    var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
                    return Math.sqrt(a * a + b * b)
                    }
                    
                    //碰撞检测
                    function isButt(obj1, obj2) {
                    var l1 = obj1.offsetLeft;
                    var t1 = obj1.offsetTop;
                    var r1 = obj1.offsetLeft + obj1.offsetWidth;
                    var b1 = obj1.offsetTop + obj1.offsetHeight;
                    
                    var l2 = obj2.offsetLeft;
                    var t2 = obj2.offsetTop;
                    var r2 = obj2.offsetLeft + obj2.offsetWidth;
                    var b2 = obj2.offsetTop + obj2.offsetHeight;
                    
                    return !(r1 < l2 || b1 < t2 || r2 < l1 || b2 < t1)
                    }
                    
                    //获取最终样式
                    function getStyle(obj, attr) {
                    return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr])
                    }
                    
                    //运动框架
                    function startMove(obj, pos, onEnd) {
                    clearInterval(obj.timer);
                    obj.timer = setInterval(function() {
                        doMove(obj, pos, onEnd)
                    }, 30)
                    }
                    
                    function doMove(obj, pos, onEnd) {
                    var iCurL = getStyle(obj, "left");
                    var iCurT = getStyle(obj, "top");
                    var iSpeedL = (pos.left - iCurL) / 5;
                    var iSpeedT = (pos.top - iCurT) / 5;
                    iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
                    iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);
                    if (pos.left == iCurL && pos.top == iCurT) {
                        clearInterval(obj.timer);
                        onEnd && onEnd()
                    } else {
                        obj.style.left = iCurL + iSpeedL + "px";
                        obj.style.top = iCurT + iSpeedT + "px";
                    }
                 }
        }
    },
    mounted() {
        this.move()
    },
}
</script>

