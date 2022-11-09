const path = require('path');
const express = require('express');
const Auth = require('../models/auth');

const userController = require('../controllers/user');

const router = express.Router();

// Create new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.login);

// User making reservation
router.post('/reservation', userController.makeReservation);

// Fetch transaction
router.post('/transaction', userController.fetchTransaction);

module.exports = router;