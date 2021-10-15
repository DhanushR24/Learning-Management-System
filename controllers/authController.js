const User = require('../models/User')
const jwt = require('jsonwebtoken');
const user = require('../models/User');


const handleErrors = (err) => {
    console.log(err.message)
    let error = {
        email: '',
        password: ''
    }

    // Incorrect email
    if (err.message === 'Incorrect email') {
        error.email = "Email not registered"
    }
    if (err.message === 'Incorrect password') {
        error.password = "Password is incorrect"
    }

    // duplicate error code
    if (err.code === 11000) {
        error.email = 'Email already exists';
        return error;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            error[properties.path] = properties.message;
        })
    }
    return error;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({
        id
    }, 'this is a secret', {
        expiresIn: maxAge
    })
}
module.exports.signup_get = (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    });
}
module.exports.login_get = (req, res) => {
    res.render('login', {
        title: 'Log In'
    });
}
module.exports.signup_post = async (req, res) => {
    const {
        image,
        email,
        userName,
        name,
        phone,
        password
    } = req.body;

    try {
        const user = await User.create({
            image,
            email,
            userName,
            name,
            phone,
            password
        })
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.status(201).json({
            user: user._id
        });

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({
            errors
        });
    }
}
module.exports.login_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        res.status(200).json({
            user: user._id
        })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({
            errors
        });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })

    res.redirect('/');
}