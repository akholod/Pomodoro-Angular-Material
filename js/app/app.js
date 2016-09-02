;(function () {
    'use strict';

    const app = angular.module('PomodoroApp',['ngMaterial', 'ngAnimate']);

    app.config(function($mdThemingProvider) {
        //config Angular Material theme
        $mdThemingProvider.theme('default')
            .primaryPalette('green')
    });

    app.directive('pomodoroClock', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'templates/pomodoro-template.html',
            controller: 'PomodoroMain',
            controllerAs: 'pomodoroCtrl'
        }
    })
})();
