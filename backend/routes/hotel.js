const path = require('path');
const express = require('express');

const hotelController = require('../controllers/hotel');
const hotel = require('../models/hotel');

const router = express.Router();

// Fetch all hotels data
router.get('/hotels', hotelController.fetchAll);

// Search for hotel
router.post('/search', hotelController.search);

// Featch room by Id
router.post('/room', hotelController.fetchRoom);

// Admin fetch hotels
router.get('/admin/hotels', hotelController.adminFetchHotel);

// Admin add new hotel
router.post('/admin/add-hotel', hotelController.adminAddHotel);

// Admind delete hotel
router.post('/admin/delete-hotel', hotelController.adminDeleteHotel);

// Admin fetch rooms
router.get('/admin/rooms', hotelController.adminFetchRooms);

// Admin add new room
router.post('/admin/add-room', hotelController.adminAddRoom);

// Admin delete room
router.post('/admin/delete-room', hotelController.adminDeleteRoom);

// Admin fetch edit hotel
router.get('/admin/edit-hotel/:hotelId', hotelController.adminEditHotel);

// Admin update edit Hotel
router.post('/admin/edit-hotel/:hotelId', hotelController.postEditHotel);

// Admin fetch edit room
router.get('/admin/edit-room/:roomId', hotelController.adminEditRoom);

// Admid post edit room
router.post('/admin/edit-room/:roomId', hotelController.postEditRoom);

module.exports = router;