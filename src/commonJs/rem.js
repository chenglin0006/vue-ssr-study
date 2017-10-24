(function (doc, win) {
            var docEl = doc.documentElement,
                    resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
                    recalc = function () {
                        var clientWidth = docEl.clientWidth;

                        if (!clientWidth) return;

                        //在375px宽度的屏幕下 1rem = 100px
                        docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
                    };

            if (!doc.addEventListener) return;

            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);