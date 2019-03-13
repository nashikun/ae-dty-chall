const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');
const reasons = mongoose.model('user').failedLogin;
const config = require('./config');

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

    passport.use(new FacebookStrategy(config.fb,
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
};
