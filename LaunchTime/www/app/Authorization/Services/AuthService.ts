/// <reference path="authstorage.ts" />
/// <reference path="../../appmain/config.ts" />
/// <reference path="../models/tokendata.ts" />
/// <reference path="../../appmain/app.ts" />

module Authorization {
    export class AuthService {

        static $inject = ['$injector', 'AuthStorage', '$interval']
        private _tokenTask: angular.IPromise<any>;        

        constructor(private $injector, private authStorage: AuthStorage, private $interval: angular.IIntervalService) { }

        /// Logowanie
        Login(): angular.IPromise<boolean> {            
            var http = this.$injector.get("$http");
            return http.post(Configuration.ServiceLocation + "tokens", {"access_token": "token123"}).then((res) => {

                // utworzenie tokenu
                var token = <TokenData>res.data;                
                this.authStorage.Set("tokenData", token);             
                return true;
            });
        };

        GetTokenValue = (): string => {
            var token: TokenData = this.authStorage.Get("tokenData");
            if (!token) return null;          
            return token.token;
        }

        RefreshToken = () => {         
            this.Login();
        };

        /// Wylogowanie
        Logout = () => {
            // usuwam token          
            this.authStorage.Remove("tokenData");           
            var stateProvider = this.$injector.get("$state");       
            stateProvider.go("mainView");
        };

        IsAuthenticated = (): boolean => {
            var token = this.GetTokenValue();           
            return token == null ? false : true;
        };       
    }
}

app.service('AuthService', Authorization.AuthService);
