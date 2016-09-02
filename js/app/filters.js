/**
 * Created by LocalAdmin on 02.09.2016.
 */
;(function () {
    'use strict';

    angular.module('PomodoroApp').filter('minuteFilter', function () {
        return function (seconds) {
            if (seconds) {
                return Math.floor(seconds / 60);
            }
            return '00';
        }
    });

    angular.module('PomodoroApp').filter('secondFilter', function () {
        return function (time) {
            let seconds = Math.round(time % 60);
            if (time) {
                return (seconds < 10) ? ('0' + seconds) : seconds;
            }
            if(Math.round(time % 60) < 10) {
                return '0' + seconds;
            }
            return '00';
        }
    });

})();