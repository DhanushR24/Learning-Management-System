const { Router } = require('express');
const router = Router(); 
const authCOntroller = require('../controllers/authController')

router.get('/signup', authCOntroller.signup_get)
router.post('/signup', authCOntroller.signup_post)
router.get('/login', authCOntroller.login_get)
router.post('/login', authCOntroller.login_post)

router.get('/logout', authCOntroller.logout_get)

module.exports = router;