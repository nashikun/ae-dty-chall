const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const reasons = mongoose.model('user').failedLogin;

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        mongoose.model('user').findOne({email: email}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {reason: reasons.NOT_FOUND});
            }
            if (!user.verified) {
                return done(null, false, {reason: reasons.UNVERIFIED});
            }
            if (user.isLocked) {
                return user.incLoginAttempts(function (err) {
                    if (err) return done(err);
                    return done(null, false, {reason: reasons.MAX_ATTEMPTS});
                });
            }
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    if (!user.loginAttempts && !user.lockUntil) {
                        return done(null, user);
                    }
                    const updates = {
                        $set: {loginAttempts: 0},
                        $unset: {lockUntil: 1}
                    };
                    return user.update(updates, function (err) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, user);
                    });
                }
                user.incLoginAttempts(function (err) {
                    if (err) return done(err);
                    return done(null, false, reasons.PASSWORD_INCORRECT);
                });
            });
        });
    }));

    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_PWD
        },
        function (jwtPayload, cb) {
            return mongoose.model('user').findById(jwtPayload.subject)
                .then(user => {
                    //console.log(user);
                    return cb(null, {_id: user._id, role: user.role});
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));
};
