const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

// POST admin sign up
router.post('/signup', adminController.postAdminSignUp);

// POST admin sign in
router.post('/signin', adminController.postAdminSignIn);

// GET all products
router.get('/products', adminController.adminGetProducts);

// POST search product
router.post('/search', adminController.adminSearchProduct);

module.exports = router;