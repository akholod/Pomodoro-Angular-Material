/**
 * Created by LocalAdmin on 31.08.2016.
 */
;(function () {
    'use strict';
    angular.module('PomodoroApp').controller('PomodoroMain', function(TimerFunc) {
        var self = this;

        self.toggleContent = function(showContent) {
            self.displayContent = showContent;
        };

        self.timer = {
            isPause: true,
            isSession: true,
            sessionLength: 22,
            breakLength: 5,
            outTime: 0,
            state: 'Session'
        };

        self.timer.outTime = self.timer.sessionLength * 60;

        self.startTimer = function() {
            TimerFunc.startTimer(self.timer);
        };
        self.stopTimer = function() {
            TimerFunc.stopTimer(self.timer);
        };
        self.resetTimer = function() {
            TimerFunc.resetTimer(self.timer);
        };
        self.save = function() {
            TimerFunc.save(self.timer);
        };
    });
})();