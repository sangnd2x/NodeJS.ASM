const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401);

  jwt.verify(token, `${process.env.ACCESS_TOKEN}`, (err, user) => {
    if (err) {
      return res.status(403);
    } else {
      User
        .findOne({ _id: user._id })
        .then(user => {
          // console.log('from jwt', user)
          req.user = user;
          next();
        })
        .catch(err => console.log(err));
    }
  });
}
