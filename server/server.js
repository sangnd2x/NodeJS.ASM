const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const server = express();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flag: 'a' });

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

server.use(cors());
server.use(express.json({
  type: ['application/json']
}));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(helmet());
server.use(compression());
server.use(morgan('combined', { stream: accessLogStream }));
server.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('images'));
server.use('/images', express.static(path.join(__dirname, 'images')));

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