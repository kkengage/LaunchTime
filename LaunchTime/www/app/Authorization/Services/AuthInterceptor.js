/// <reference path="../models/auth_events.ts" />
var Authorization;
(function (Authorization) {
    var AuthInterceptor = (function () {
        function AuthInterceptor($rootScope, $q, authService, auth_events) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.authService = authService;
            this.auth_events = auth_events;
            this.responseError = function (response) {
                _this.$rootScope.$broadcast({
                    401: _this.auth_events.notAuthenticated,
                    403: _this.auth_events.notAuthorized,
                    419: _this.auth_events.sessionTimeout,
                    440: _this.auth_events.sessionTimeout,
                }[response.status], response);
                return _this.$q.reject(response);
            };
            this.request = function (config) {
                config.headers = config.headers || {};
                var token = _this.authService.GetTokenValue();
                if (token)
                    config.headers.Authorization = 'Bearer ' + token;
                return config;
            };
        }
        AuthInterceptor.$inject = ['$rootScope', '$q', 'AuthService', 'AUTH_EVENTS'];
        return AuthInterceptor;
    })();
    Authorization.AuthInterceptor = AuthInterceptor;
})(Authorization || (Authorization = {}));
app.service('AuthInterceptor', Authorization.AuthInterceptor);
// rejestruje interceptora
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(['AuthInterceptor',
        function (auth) { return auth; }
    ]);
});
//# sourceMappingURL=AuthInterceptor.js.map