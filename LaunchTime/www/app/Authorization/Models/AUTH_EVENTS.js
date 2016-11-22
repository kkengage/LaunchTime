var Authorization;
(function (Authorization) {
    var AUTH_EVENTS = (function () {
        function AUTH_EVENTS() {
            this.loginSuccess = 'auth-login-success';
            this.loginFailed = 'auth-login-failed';
            this.logoutSuccess = 'auth-logout-success';
            this.sessionTimeout = 'auth-session-timeout';
            this.notAuthenticated = 'auth-not-authenticated';
            this.notAuthorized = 'auth-not-authorized';
        }
        return AUTH_EVENTS;
    })();
    Authorization.AUTH_EVENTS = AUTH_EVENTS;
})(Authorization || (Authorization = {}));
app.constant('AUTH_EVENTS', new Authorization.AUTH_EVENTS());
//# sourceMappingURL=AUTH_EVENTS.js.map