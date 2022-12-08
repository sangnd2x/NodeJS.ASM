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

// GET admin fetch all chat rooms
router.get('/chatrooms', adminController.getAllChatRooms);

// GET room by id
router.get('/chatrooms/getById', adminController.getChatRoomId);

// GET fetch clients
router.get('/clients', adminController.fetchClients);

// GET fetch orders
router.get('/orders', adminController.fetchOrders);

// POST add new product
router.post('/new-product', adminController.addNewProduct);

module.exports = router;