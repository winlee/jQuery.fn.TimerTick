/**
 * @name TimerTick.js
 * @description ：code a timer, has a count down effec;
 * @version v0.0.1
 * @author winleechina@gmail.com
 * @see http:
 */
//Make sure jQuery has been loaded before TimerTick.js
if (typeof jQuery === "undefined") {
    throw new Error("TimerTick requires jQuery");
}

(function ($) {
    window.TIMER_CONTAINER = window.TIMER_CONTAINER || [];

    $.fn.TimerTick = function (id, option) {
        var defaultSetting = {
            endTime: new Date(new Date().getTime() + 3600000),
            callback: null,
            interval: 1000
        };

        var settings = $.extend(defaultSetting, option, { id: id });

        // @orderNo: string 计时器的唯一标识符 * @endTime: string 到期时间 格式：yyyy-MM-dd HH:mm:ss
        /**
         * init one timer
         * @param string endTime format:yyyy-MM-dd HH:mm:ss, to close the timer
         * @returns object
         */
        var initSingleTimer = function (endTime) {
            clearInterval(TIMER_CONTAINER[id]);

            if (new Date() <= new Date(endTime)) {
                //settings不知道这里怎么获取，所以把initSingleTimer放到这里，但是这里的this=window，因此有了下面的initSingleTimer.call(this..
                TIMER_CONTAINER[id] = setInterval(countDown.call(this, id, endTime, settings.callback),
                    1000);
            }
        };

        initSingleTimer.call(this, id, settings.endTime);
        return this;
    };

    /**
     *  timer core function
     * @param string orderNo  the timer's identifier
     * @param string endTime format:yyyy-MM-dd HH:mm:ss
     * */
    function countDown(id, endTime, callback) {
        "use strict";
        var that = this;
        return function () {
            var currentTime = new Date(),
                lockSeconds = parseInt((new Date(endTime).getTime() - currentTime.getTime()) / 1000),
                leftHours = 0,
                leftMinutes = 0,
                leftSeconds = 0;

            if (lockSeconds > 0) {
                leftHours = parseInt(lockSeconds / 3600); //剩余小时
                leftMinutes = parseInt((lockSeconds - leftHours * 3600) / 60); //剩余分钟
                leftSeconds = parseInt(lockSeconds - leftHours * 3600 - leftMinutes * 60); //剩余s
            } else {
                callback && callback();
                clearInterval(TIMER_CONTAINER[id]);
            }

            $(that).html(leftAlign(leftHours) + ":" + leftAlign(leftMinutes) + ":" + leftAlign(leftSeconds));
        };
    }

    /**
     * left align the datetime's number to 2 digit
     * @param int number
     * @returns string
     */
    function leftAlign(number) {
        return number < 10 ? "0" + number : number;
    }
}(jQuery));
