const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const server = express();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

server.use(cors());
server.use(express.json({
  type: ['application/json']
}));
server.use(bodyParser.urlencoded({ extended: false }));

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j1wx6nb.mongodb.net/${process.env.DB_DEFAULT}`;

server.use(authRoute);
server.use(userRoute);
server.use('/admin', adminRoute);

mongoose.connect(MONGO_URI)
  .then(result => {
    const app = server.listen(process.env.PORT || 5000);
    const io = require('./socket').init(app);
    io.on('connection', socket => {
      console.log('Connected');
    })
  })
  .catch(err => console.log(err));