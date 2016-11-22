module Authorization {
    export class AuthStorage {
        private _cookies;

        //static $inject = ['$cookies'];
        //constructor($cookies) {            
        //    this._cookies = $cookies;
        //}

        constructor() {
        }

        public Set(key: string, value: any) {
            if (value == null) window.sessionStorage.removeItem(key);
            else window.sessionStorage.setItem(key, JSON.stringify(value));
        }

        public Get(key: string): any {
            var val = window.sessionStorage.getItem(key);
            if (val == null) return null;
            return JSON.parse(val);
        }

        public Remove(key: string) {
            window.sessionStorage.removeItem(key);
        }

        public Clear() {
            window.sessionStorage.clear();
        }
    }
}
app.service('AuthStorage', Authorization.AuthStorage);