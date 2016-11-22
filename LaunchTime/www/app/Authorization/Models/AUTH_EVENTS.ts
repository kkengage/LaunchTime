module Authorization {

    export class AUTH_EVENTS {
        loginSuccess: string = 'auth-login-success'
        loginFailed: string = 'auth-login-failed'
        logoutSuccess: string = 'auth-logout-success'
        sessionTimeout: string = 'auth-session-timeout'
        notAuthenticated: string = 'auth-not-authenticated'
        notAuthorized: string = 'auth-not-authorized'
    }
}

app.constant('AUTH_EVENTS', new Authorization.AUTH_EVENTS())