const express = require('express');
const { signin, signup, signout } = require('../controllers/authController.js');
const router = express.Router();

router.post('/sign-in', signin);
router.post('/sign-up', signup);
router.post('/sign-out', signout);

module.exports = router;
