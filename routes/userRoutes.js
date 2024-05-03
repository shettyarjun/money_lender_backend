const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controllers/userController');
const router = express.Router();
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(validateTokenHandler, userProfile);


module.exports = router;