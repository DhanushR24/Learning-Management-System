const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    image: {
        type: String,
        default: 'images/profilePic.svg'
    },
    userName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please enter an email ID'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    userName:{
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum 6 characters password']
    }
})
UserSchema.post('save', function (doc, next) {
    console.log('New user', doc)
    next()
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const user = mongoose.model('user', UserSchema);

module.exports = user;