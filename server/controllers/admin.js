const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Session = require('../models/session');
const nodeMailer = require('nodemailer');
const product = require('../models/product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postAdminSignUp = async (req, res, next) => {
  const { fullname, email, password, phone } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const hashedPass = await bcrypt.hash(password, 12);
      const newUser = new User({
        fullname: fullname,
        email: email,
        password: hashedPass,
        phone: phone,
        role: 'Admin',
      });
      const response = await newUser.save();
      if (!response) {
        res.statusMessage = 'Cannt create admin user'
        return res.status(400).end();
      } else {
        res.statusMessage = 'New admin user created';
        res.status(200).end();
      } 
    } else {
      res.statusMessage = 'This email is already been used';
      res.status(400).end();
    }
  } catch (err) {
    console.log(err);
  }
}

exports.postAdminSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: 'No user found' });
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        res.statusMessage = 'Wrong Password';
        return res.status(404).end();
      } else {
        const accessToken = jwt.sign(user.toJSON(), `${process.env.ACCESS_TOKEN}`);
        res.statusMessage = 'Successfully signed in'
        res.status(200).json({ accessToken: accessToken });
      }
    }
  } catch (err) {
    console.log(err);
  }
}

exports.adminGetProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    console.log(err);    
  }
}

exports.adminSearchProduct = async (req, res, next) => {
  const query = req.body.query;
  try {
    const products = await Product.find();
    const results = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    res.status(200).send(results);
  } catch (err) {
    console.log(err)
  }
}

exports.getAllChatRooms = async (req, res, next) => {
  try {
    const chatRooms = await Session.find();
    res.status(200).send(chatRooms);
  } catch (err) {
    console.log(err);    
  }
}

exports.getChatRoomId = async (req, res, next) => {
  const roomId = req.query.roomId;
  // console.log(roomId)
  try {
    const chatRoom = await Session.findById(roomId);
    res.status(200).send(chatRoom);
  } catch (err) {
    console.log(err);
  }
};

exports.fetchClients = async (req, res, next) => {
  try {
    const users = await User.find();
    const clients = users.filter(user => user.role === 'Client');
    res.status(200).send(clients);
  } catch (err) {
    console.log(err);
  }
}

exports.fetchOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    let earning = 0;
    for (let i = 0; i < orders.length; i++) {
      earning += orders[i].totalBill;
    }
    res.status(200).json({ earning: earning, orders: orders });
  } catch (err) {
    console.log(err);
  }
}

exports.addNewProduct = async (req, res, next) => {
  const { productName, category, price, shortDesc, longDesc } = req.body;
  const images = req.files.map(file => 'http://localhost:5000/' + file.path);
  console.log(price)
  
  try {
    const product = new Product({
      name: productName,
      category: category,
      img1: images[0],
      img2: images[1],
      img3: images[2],
      img4: images[3],
      long_desc: longDesc,
      short_desc: shortDesc,
      price: price
    });
    const response = await product.save();
    res.status(200).json({ msg: 'New product added' });
  } catch (err) {
    console.log(err);
  }
}
