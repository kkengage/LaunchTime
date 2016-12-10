/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../typings/serial/serial.d.ts" />

var app = angular.module('lunch', ['ui.router', 'toastr']);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
});


// Toaster configuration
app.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-full-width',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        target: 'body',
        timeOut: 4000,
        closeButton: true,
        extendedTimeOut: 1000,
        progressBar: false
    });
});
