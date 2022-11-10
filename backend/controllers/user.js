const User = require('../models/user');
const Transaction = require('../models/transaction');
const mongodb = require('mongodb');
const transaction = require('../models/transaction');

exports.registerUser = (req, res, next) => {
    const { username, password, fullName, phoneNumber, email, isAdmin } = req.body;
    const newUser = new User({
        username: username,
        password: password,
        isAdmin: isAdmin
    });
    User.find({ 'username': username })
        .then(user => {
            if (user.length > 0) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({ message: 'Username is already existed' }));
                res.end();
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({ message: 'Succesfully registered' }));
                res.end();
                return newUser.save();
            }
        })
        .then(result => console.log('result', result))
        .catch(err => console.log(err));
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;
        User
            .find({'username': username})
            .then(user => {
                if (user.length > 0) {
                    if (user[0].password === password) {
                        req.user = user[0];
                        return res.status(200).send(user[0]);
                    } else {
                        return res.status(400).json({ message: 'Password Is Not Correct' });
                    }
                } else {
                    return res.status(400).json({ message: 'User Not Found' });
                }
            })
            .catch(err => console.log(err));
};

exports.makeReservation = (req, res, next) => {
    const { user, hotel, room, dateStart, dateEnd, price, payment, status } = req.body;
    const transaction = new Transaction({
        user: user,
        hotel: new mongodb.ObjectId(hotel),
        room: room,
        dateStart: dateStart,
        dateEnd: dateEnd,
        price: price,
        payment: payment,
        status: status
    });
    transaction
        .save()
        .then(result => {
            res.status(200).send(JSON.stringify({ message: "Successfully Reserved" }));
            console.log('Added Transaction');
        })
        .catch(err => console.log(err));
};

exports.fetchTransaction = (req, res, next) => {
    const { user } = req.body;
    Transaction
        .find({ user: user })
        .then(transaction => res.status(200).send(transaction))
        .catch(err => console.log(err));
}