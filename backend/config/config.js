module.exports = {
    local: {
        usernameField: 'email',
        passwordField: 'password',
    }, fb: {
        clientID: '2043788692590804',
        clientSecret: '07071bcd7a4f77ba4480f98214029b6b',
        callbackURL: "https://localhost:3000/auth/facebook/callback",
        profileURL: 'https://graph.facebook.com/v3.2/me?fields=id,name,picture,email',
        profileFields: ['id', 'email', 'name', 'picture']
    }
};
