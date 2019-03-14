const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const reasons = mongoose.model('user').failedLogin;
const config = require('./config');
const cookieExtractor = function (req) {
    const token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        mongoose.model('user').findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(config.local, (email, password, done) => {
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
                    return user.update({
                        $set: {loginAttempts: 0},
                        $unset: {lockUntil: 1}
                    }, function (err) {
                        if (err) {
                            return done(err);
                        }
                        return done(null, user);
                    });
                }
                user.incLoginAttempts(function (err) {
                    if (err) return done(err);
                    return done(null, false, {reason: reasons.PASSWORD_INCORRECT});
                });
            });
        });
    }));

    passport.use(new JWTStrategy(config.jwt,
        function (req, jwtPayload, cb) {
            return mongoose.model('user').findById(jwtPayload.id)
                .then(user => {
                    req.user = user;
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));

    passport.use(new FacebookTokenStrategy(config.fb,
        async function (accessToken, refreshToken, profile, done) {
            const user = await mongoose.model('user').findOne({'email': profile._json.email}).catch(err => {
                console.error(err);
                done(err);
            });
            if (user) {
                return done(null, user);
            }

        }
    ));

    passport.use(new GoogleTokenStrategy(config.google,
        async function (accessToken, refreshToken, profile, done) {
            const user = await mongoose.model('user').findOne({'email': profile._json.email}).catch(err => {
                console.error(err);
                done(err);
            });
            if (user) {
                return done(null, user);
            } else {
                return done(null, null);
            }
        }
    ));
};
