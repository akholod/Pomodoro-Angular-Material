;(function () {
    'use strict';
    /**
     * play mp3 alarm when timer is counted
     */
    angular.module('PomodoroApp').service('Audio', function () {
        let sound = new buzz.sound( "sound/buzzer", {
            formats: ["mp3"],
            preload: true
        });
        this.playAlarmSound = function(){
            sound.play();
        }
    });

    /**
     * timer logic service, store methods for start,stop, end reset timer
     * $interval - implements seconds counting
     */
    angular.module('PomodoroApp').service('TimerFunc', function($interval, Audio) {
        let secondTimer;
        let lastCountValue = 0;
        let countValue = 0;

        /**
         * choose what value timer counting. Session, break or memory time(if we stoped timer and the start)
         * @param isSession bool
         * @param sessionLength int
         * @param breakLength int
         * @param lastCountValue int
         * @returns {*}
         */
        function chooseValue(isSession, sessionLength, breakLength,  lastCountValue) {
            if(lastCountValue) {
                return lastCountValue;
            }
            if(isSession) {
                return sessionLength * 60;
            }
            return breakLength * 60;
        }

        /**
         * reset all timer values to default
         * @param timer object
         */
        function resetTimer (timer) {
            timer.isPause = true;
            $interval.cancel(secondTimer);
            lastCountValue = 0;
            timer.outTime = chooseValue(timer.isSession, timer.sessionLength, timer.breakLength, lastCountValue);
        }

        this.startTimer = function(timer){
            //check if already started
            if(!timer.isPause) {
                return
            }
            timer.isPause = false;
            //chose counting value
            countValue =  chooseValue(timer.isSession, timer.sessionLength, timer.breakLength, lastCountValue);
            //create new $interval object for calling function each 1s.
            secondTimer = $interval(function(){
                --countValue;
                // if counted, chose another value for counting, and change state
                if(countValue == 0) {
                    timer.isSession = !timer.isSession;
                    countValue = chooseValue(timer.isSession, timer.sessionLength, timer.breakLength, lastCountValue);
                    timer.state = 'Break';
                    if (timer.isSession) {
                        timer.state = 'Session';
                    }

                }
                timer.outTime = countValue;
            }, 1000);

        };
        /**
         * stop method save counting value in memory, and canceling $interval
         * @param timer object
         */
        this.stopTimer = function(timer){
            timer.isPause = true;
            $interval.cancel(secondTimer);
            lastCountValue = countValue;
        };

        this.resetTimer = resetTimer;
        this.save = resetTimer;
    });

})();