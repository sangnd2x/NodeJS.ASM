const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Session = require('../models/session');
const nodeMailer = require('nodemailer');
const io = require('../socket')

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ msg: 'No product found' });
    } else {
      res.status(200).send(products);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getProductDetails = async (req, res, next) => {
  const prodId = req.params.prodId;
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      return res.status(404).json({ msg: 'No product found' });
    } else {
      res.status(200).send(product);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addProductToCart = async (req, res, next) => {
  const { idUser, idProduct, count } = req.body;
  try {
    const product = await Product.findById(idProduct);
    // const user = await User.findById(idUser);
    const reponse = await req.user.addToCart(product, count, idUser);
    res.status(200).json({ msg: 'Successfully added product to cart' });
  } catch (err) {
    console.log(err)
  }
};

exports.getCart = async (req, res, next) => {
  try {
    // const user = await User.findById(idUser);
    const cart = req.user.cart.items;
    res.status(200).send(cart);
  } catch (err) {
    console.log(err);
  }
};  

exports.postEmail = async (req, res, next) => {
  const { to, fullname, phone, address, idUser } = req.body;
  try {
    const products = req.user.cart.items.map(item => {
      return {
        quantity: item.count,
        product: { ...item._doc }
      };
    });

    // Calculate total bill for this order
    let totalBill = 0;
    for (let i = 0; i < products.length; i++){
      totalBill += products[i].product.total;
    }

    const order = new Order({
      user: {
        name: req.user.fullname,
        phone: phone,
        address: address,
        userId: req.user._id
      },
      orderDate: new Date(),
      orderStatus: 'Waiting for pay',
      orderDelivery: 'processing',
      totalBill: totalBill,
      products: products,
    });

    const savedOrder = await order.save();
    if (savedOrder) {
      //Send email 
      let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'derp12.08@gmail.com',
          pass: 'rjmljugcmvzaxcdw'
        }
      });
  
      let mailDetails = {
        from: 'derp12.08@gmail.com',
        to: to,
        subject: 'YOUR ORDER FROM BOUTIQUE',
        html: `
        <h1>Xin Chào ${savedOrder.user.name}</h1><br/
        <p>Số điện thoại: ${savedOrder.user.phone}</p>
        <p>Địa chỉ: ${savedOrder.user.address}</p>
        <table>
          <thead>
            <tr>
              <th style="border: 1px solid black">Tên sản phẩm</th>
              <th style="border: 1px solid black">Hình ảnh</th>
              <th style="border: 1px solid black">Giá</th>
              <th style="border: 1px solid black">Số lượng</th>
              <th style="border: 1px solid black">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            ${savedOrder.products.map(prod => {
              return `
                <tr>
                  <td style="border: 1px solid black">${prod.product.nameProduct}</td>
                  <td style="border: 1px solid black"><img src="${prod.product.imgProduct}" width="80" height="80" /></td>
                  <td style="border: 1px solid black">${prod.product.priceProduct}</td>
                  <td style="border: 1px solid black">${prod.quantity}</td>
                  <td style="border: 1px solid black">${prod.quantity * prod.product.priceProduct}</td>
                </tr>
              `
            })}
          </tbody>
        </table>
        <p>Ngày đặt hàng: ${savedOrder.orderDate.toLocaleDateString('en-GB')}</p>
        <h2>Thành tiền: ${new Intl.NumberFormat('vn-VN', {style: 'currency', currency: 'VND'}).format(savedOrder.totalBill)}</h2>
        `
      }
      res.status(200).json({ msg: 'New order created' })
      transporter.sendMail(mailDetails, (err, info) => {
        if (err) {
          return console.log(err);
        } else {
          console.log('Email sent');
          req.user.clearCart();
          res.status(200).json({ msg: 'New order created' });
        }
      });
    } else {
      res.status(400).json({msg: 'No order'})
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getHistory = async (req, res, next) => {
  const { idUser } = req.query;

  try {
    const userOrders = await Order.find({ 'user.userId': idUser });
    res.status(200).send(userOrders);
  } catch (err) {
    console.log(err);
  }
};

exports.getDetailedHistory = async (req, res, next) => {
  const { orderId } = req.params;
  
  try {
    const order = await Order.findById(orderId);
    res.status(200).send(order);
  } catch (err) {
    console.log(err);
  }
};

exports.createNewChatRoom = async (req, res, next) => {
  try {
    const session = new Session({
      user: {
        name: req.user.fullname,
        userId: req.user._id
      },
      createdDate: new Date(),
      messages: []
    });

    const savedSession = await session.save();
    console.log(savedSession)
    res.status(200).json({ msg: 'New chat room created', session: savedSession });
  } catch (err) {
    console.log(err);
  }
};

exports.addMessage = async (req, res, next) => {
  const { roomId, message } = req.body;
  // console.log(roomId);

  try {
    const chatRoom = await Session.findById(roomId);
    // console.log(chatRoom)
    const addedMessage = await chatRoom.addMessage(message);
    io.getIo().on('send_message', data => {
      console.log(data)
    })
    res.status(200).send(chatRoom);
  } catch (err) {
    console.log(err);    
  }
};

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
