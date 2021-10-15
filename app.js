const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const port = process.env.port || 5000;

const authRoutes = require('./routes/authRoutes')
const tasksRoutes = require('./routes/tasksRoutes')

const User = require('./models/User')

const {
    requireAuth,
    checkUser
} = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('tiny'))
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://DbConnect:test12345@cluster.bh7j7.mongodb.net/UsersDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index', {
    title: 'home'
}));
app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'courses'
    });
})

app.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Profile'
    })
});

app.put('/profile/:id', (req, res) => {
    const _id = req.params.id;
    const {
        userName,
        name,
        phone
    } = req.body;


    User.findByIdAndUpdate({
            _id
        }, {
            userName,
            name,
            phone
        })
        .then(result => {
            res.json({
                redirect: '/profile'
            })
        })
        .catch((err) => {
            console.log("error :(")
        })
})

app.use(authRoutes)
app.use('/tasks', tasksRoutes)
app.use((req, res) => {
    res.render('404', {
        title: 'Error'
    })
});