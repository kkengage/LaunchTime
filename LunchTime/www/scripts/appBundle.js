// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var LunchTime;
(function (LunchTime) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            //window.StatusBar.hide();            
            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            //var parentElement = document.getElementById('deviceready');
            //var listeningElement = parentElement.querySelector('.listening');
            //var receivedElement = parentElement.querySelector('.received');
            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');                          
        }
        function onPause() {
            // TODO: This application has been suspended. Save application state here.
            //window.StatusBar.show();
        }
        function onResume() {
            // TODO: This application has been reactivated. Restore application state here.
            //window.StatusBar.hide();
        }
    })(Application = LunchTime.Application || (LunchTime.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(LunchTime || (LunchTime = {}));
//# sourceMappingURL=appBundle.js.map