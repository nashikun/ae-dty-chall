const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = {
    local: {
        usernameField: 'email',
        passwordField: 'password',
    }, fb: {
        clientID: '2043788692590804',
        clientSecret: '07071bcd7a4f77ba4480f98214029b6b',
        profileURL: 'https://graph.facebook.com/v3.2/me?fields=id,name,picture,email',
        profileFields: ['id', 'email', 'name', 'picture']
    }, google: {
        clientID: '42829928231-om2fbrg8kofb77jagpo8rv42go4neavf.apps.googleusercontent.com',
        clientSecret: 'fE-8FZ0ZyNdu5UCPU2cesj26'
    }, jwt: {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_PWD
    }
};
