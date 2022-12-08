const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

// GET all products
router.get('/products', userController.getAllProducts);

// Get product details
router.get('/products/:prodId', userController.getProductDetails);

// POST add product to cart
router.post('/add-to-cart', jwtAuth, userController.addProductToCart);

// GET get items from user's cart
router.get('/carts', jwtAuth, userController.getCart);

// POST order
router.post('/email', jwtAuth, userController.postEmail);

// GET user's order history
router.get('/histories', jwtAuth, userController.getHistory);

// Get user's order detailed history
router.get('/histories/:orderId', jwtAuth, userController.getDetailedHistory);

// POST create new chat room
router.post('/chatrooms/createNewRoom', jwtAuth, userController.createNewChatRoom);

// GET chat room id
router.get('/chatrooms/getById', jwtAuth, userController.getChatRoomId);

// PUT add message to chat room
router.put('/chatrooms/addMessage', jwtAuth, userController.addMessage);



module.exports = router;