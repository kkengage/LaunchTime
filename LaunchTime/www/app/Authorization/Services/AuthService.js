/// <reference path="authstorage.ts" />
/// <reference path="../../appmain/config.ts" />
/// <reference path="../models/tokendata.ts" />
var Authorization;
(function (Authorization) {
    var AuthService = (function () {
        function AuthService($injector, authStorage, $interval) {
            var _this = this;
            this.$injector = $injector;
            this.authStorage = authStorage;
            this.$interval = $interval;
            this.GetTokenValue = function () {
                var token = _this.authStorage.Get("tokenData");
                if (!token)
                    return null;
                return token.token;
            };
            this.RefreshToken = function () {
                _this.Login();
            };
            /// Wylogowanie
            this.Logout = function () {
                // usuwam token          
                _this.authStorage.Remove("tokenData");
                var stateProvider = _this.$injector.get("$state");
                stateProvider.go("mainView");
            };
            this.IsAuthenticated = function () {
                var token = _this.GetTokenValue();
                return token == null ? false : true;
            };
        }
        /// Logowanie
        AuthService.prototype.Login = function () {
            var _this = this;
            var http = this.$injector.get("$http");
            return http.post(Configuration.ServiceLocation + "tokens", { "access_token": "token123" }).then(function (res) {
                // utworzenie tokenu
                var token = res.data;
                _this.authStorage.Set("tokenData", token);
                return true;
            });
        };
        ;
        AuthService.$inject = ['$injector', 'AuthStorage', '$interval'];
        return AuthService;
    })();
    Authorization.AuthService = AuthService;
})(Authorization || (Authorization = {}));
app.service('AuthService', Authorization.AuthService);
//# sourceMappingURL=AuthService.js.map