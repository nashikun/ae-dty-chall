const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const emailPattern = new RegExp('([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \\t]|(\\\\[\\t -~]))+")@([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|\\[[\\t -Z^-~]*])');
// RFC 5322
const passwordPattern = new RegExp('(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,}$');
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 60 * 60 * 1000;

const userSchema = Schema({
    email: {
        type: String,
        required: [true, "please enter a valid email"],
        index: {unique: true},
        match: [emailPattern, 'invalid email']
    },
    password: {
        type: String,
        required: [true, "please enter a valid password"],
        match: [passwordPattern, 'invalid password']
    },
    role: {type: String, default: 'user'},
    list: {type: Schema.Types.ObjectId, ref: 'list'},
    profile: {type: Schema.Types.ObjectId, ref: 'profile'},
    facebookProvider: {type: {id: String, token: String}, select: false},
    loginAttempts: {type: Number, required: true, default: 0},
    lockUntil: Number,
    verified: {type: Boolean, default: false},
    banned: {type: Boolean, default: false},
    verificationURL: String
}, {timestamps: {createdAt: true, updatedAt: false}});

userSchema.index({email: 1});

userSchema.index({createdAt: 1}, {expireAfterSeconds: 60 * 60 * 24, partialFilterExpression: {verified: false}});

userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        next(null, isMatch);
    });
};

userSchema.methods.incLoginAttempts = function (cb) {
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: {loginAttempts: 1}, $unset: {lockUntil: 1}
        }, cb);
    }
    const updates = {$inc: {loginAttempts: 1}};
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = {lockUntil: Date.now() + LOCK_TIME};
    }
    return this.update(updates, cb);
};

userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

const reasons = userSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2,
    UNVERIFIED: 3
};

module.exports = mongoose.model('user', userSchema, 'users');
