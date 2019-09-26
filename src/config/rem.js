/*
 * @Description: In User Settings Editc)
 * @Author: your name
 * @Date: 2019-07-23 13:52:01
 * @LastEditTime: 2019-08-21 15:42:47
 * @LastEditors: Please set LastEditors
 */
(function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // if (clientWidth <750) {
        //     docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            
        // } 
        // if (clientWidth <=1440)  {
        //     docEl.style.fontSize = 100 * (1440 / 1920) + 'px';
        // }else{
        //     docEl.style.fontSize = '100px';
        // }
        
    };


if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//19120X1080 26.7%,1366X768 21.97%，1440X900 15.39%，1600X900  7.42%
