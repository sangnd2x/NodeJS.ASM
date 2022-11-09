const path = require('path');
const express = require('express');
const Auth = require('../models/auth');

const hotelController = require('../controllers/hotel');

const router = express.Router();

// Fetch all hotels data
router.get('/hotels', hotelController.fetchAll);

// Search for hotel
router.post('/search', hotelController.search);

// Featch room by Id
router.post('/room', hotelController.fetchRoom);

module.exports = router;