/// <reference path="authstorage.ts" />
/// <reference path="../../appmain/config.ts" />
/// <reference path="../models/tokendata.ts" />
/// <reference path="../../appmain/app.ts" />
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
            var http = this.$injector.get("$http");
            var _self = this;
            // token powinien byc device serial number device.serial
            return http.post(Configuration.ServiceLocation + "tokens", { "access_token": "token123" }).success(function (res) {
                // utworzenie tokenu
                var token = res;
                _self.authStorage.Set("tokenData", token);
            }).error(function (msg) {
                alert("error returned " + msg);
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