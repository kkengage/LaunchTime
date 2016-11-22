var Authorization;
(function (Authorization) {
    var AuthStorage = (function () {
        //static $inject = ['$cookies'];
        //constructor($cookies) {            
        //    this._cookies = $cookies;
        //}
        function AuthStorage() {
        }
        AuthStorage.prototype.Set = function (key, value) {
            if (value == null)
                window.sessionStorage.removeItem(key);
            else
                window.sessionStorage.setItem(key, JSON.stringify(value));
        };
        AuthStorage.prototype.Get = function (key) {
            var val = window.sessionStorage.getItem(key);
            if (val == null)
                return null;
            return JSON.parse(val);
        };
        AuthStorage.prototype.Remove = function (key) {
            window.sessionStorage.removeItem(key);
        };
        AuthStorage.prototype.Clear = function () {
            window.sessionStorage.clear();
        };
        return AuthStorage;
    })();
    Authorization.AuthStorage = AuthStorage;
})(Authorization || (Authorization = {}));
app.service('AuthStorage', Authorization.AuthStorage);
//# sourceMappingURL=authstorage.js.map