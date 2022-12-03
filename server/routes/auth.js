const path = require('path');
const express = require('express');
const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

// POST sign up
router.post('/signup', authController.postSignUp);

// GET log in - send all users data to client
router.post('/users', authController.postLogin);

module.exports = router;