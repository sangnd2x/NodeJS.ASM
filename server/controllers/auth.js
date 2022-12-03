const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postSignUp = async (req, res, next) => {
  // console.log(req.query);
  const { fullname, email, password, phone } = req.query
  
  try {
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({
      fullname: fullname,
      email: email,
      phone: phone,
      password: hashedPass,
      role: 'client',
      cart: { items: [] }
    });

    const result = await user.save();
    res.status(201).json({msg:'New user created', userId: result._id})
  } catch (err) {
    console.log(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return;
    } else {
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res.status(404).json({ msg: 'Wrong password' });
      } else {
        const accessToken = jwt.sign(user.toJSON(), `${process.env.ACCESS_TOKEN}`);
        res.status(200).json({user: user, accessToken: accessToken});
      }
    }
  } catch (err) {
    console.log(err);
  }
}