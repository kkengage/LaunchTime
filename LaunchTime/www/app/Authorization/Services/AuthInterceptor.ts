/// <reference path="../models/auth_events.ts" />

module Authorization {

    export class AuthInterceptor {

        static $inject = ['$rootScope', '$q', 'AuthService', 'AUTH_EVENTS'];

        constructor(private $rootScope, private $q, private authService: AuthService, private auth_events: AUTH_EVENTS) { }

        responseError = (response) => {
            this.$rootScope.$broadcast({
                401: this.auth_events.notAuthenticated,
                403: this.auth_events.notAuthorized,
                419: this.auth_events.sessionTimeout,
                440: this.auth_events.sessionTimeout,
                //404: this.auth_events.notAuthenticated,
            }[response.status], response);
            return this.$q.reject(response);
        }

        request = (config) => {
            config.headers = config.headers || {};
            var token = this.authService.GetTokenValue();
            if (token) config.headers.Authorization = 'Bearer ' + token;
            return config;
        }
    }
}

app.service('AuthInterceptor', Authorization.AuthInterceptor);

// rejestruje interceptora
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(['AuthInterceptor',
        function (auth) { return auth; }
    ]);
})