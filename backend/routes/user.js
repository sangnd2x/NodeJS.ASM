const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// Create new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.login);

// User making reservation
router.post('/reservation', userController.makeReservation);

// Fetch transaction
router.post('/transactions', userController.fetchTransaction);

// Admin Loging
router.post('/admin/login', userController.adminLogin);

// Admin fetch transactions
router.get('/admin/transactions', userController.adminFetchTransaction);

// Admin fetch users
router.get('/admin/users', userController.adminFetchUsers);

// Admin fetch latest transactions
router.get('/admin/latest-transactions', userController.adminFetchLatestTransactions);

module.exports = router;