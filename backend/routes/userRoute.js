const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/authMiddleware')

const {login} = require('../controllers/login')
const {signup} = require('../controllers/signup')

// router.use(verifyToken);

// router.post('/login',login).post('/signup',signup)

router.route('/login').post(verifyToken,login)
router.route('/signup').post(signup)

// router.use(verifyToken);

// router.route('/login').post(login);
// router.route('/signup').post(signup);

module.exports = router