const nodemailer = require('nodemailer');
const Model = '../models/';
const User = require(Model + 'user');
const mongoose = require("mongoose");

let message = {
    from: 'Do Not Reply <no-reply@aedtychallenge.com>',
    to: '',
    subject: 'Please confirm account',
    html: 'Click the following link to confirm your account:</p><p><a href="${URL}"> here </a></p>',
    text: 'Please confirm your account by clicking the following link: ${URL}'
};

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "aedtychallenge@gmail.com",
        pass: "dtychallenge2019"
    }
});

const generateUsername = async function (username) {
    const user = await mongoose.model('profile').findOne({username: username}).catch(err => {
        console.error(err);
        throw err
    });
    if (user) {
        username += Math.floor(Math.random() * 100 + 1);
        return generateUsername(username);
    }
    return username
};

class EmailValidator {
    static async createTempUser(user, cb) {
        return this.checkAvailability(user, async (err, reasons) => {
            if (err) return cb(err);
            if (reasons) return cb(err, reasons);
            const id = new mongoose.Types.ObjectId();
            const createdUser = await User.create({
                _id: id,
                password: user.password,
                email: user.email,
                verificationURL: id + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            }).catch(err => cb(err));
            console.error(user);
            return cb(null, null, createdUser);
        })
    }

    static async checkAvailability(user, cb) {
        let reasons = {};
        const foundUser = await User.findOne({email: user.email}).catch(err => cb(err));
        if (foundUser) {
            if (!foundUser.verified) {
                reasons.unverified = true;
            } else {
                reasons.emailExists = true;
            }
        }
        if (Object.keys(reasons).length) return cb(null, reasons);
        else return cb(null, null)
    }

    static sendVerificationEmail(tempUser, cb) {
        const URL = process.env.BACKEND + '/auth/verify/' + tempUser.verificationURL;
        message.html = message.html.replace(/\${URL}/g, URL);
        message.text = message.text.replace(/\${URL}/g, URL);
        message.to = tempUser.email;
        transporter.sendMail(message, (err, info) => cb(err, info));
    }

    static async createProfile(user, cb) {
        const list = new mongoose.model('list')();
        const profile = new mongoose.model('profile')();
        const username = await generateUsername('user');
        list.user = user._id;
        profile.user = user._id;
        profile.username = username;
        // for some reason async parallel wouldnt work here, something about '$__'  being undefined. Should fix
        // if I have the time
        await list.save().catch(err => {
            console.error(err);
            return cb(err);
        });
        await profile.save().catch(err => {
            console.error(err);
            return cb(err);
        });
        user.verified = true;
        user.verificationURL = undefined;
        user.list = list._id;
        user.profile = profile._id;
        user.save().then(() => cb(null, username));
    }

}

module.exports = EmailValidator;
