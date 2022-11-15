const User = require('../models/user');
const Transaction = require('../models/transaction');
const Hotel = require('../models/hotel');
const Room = require('../models/room');
const mongodb = require('mongodb');

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
                        return res.status(200).send(JSON.stringify({ message: 'Successfully Logged In' }));
                    } else {
                        return res.status(400).send(JSON.stringify({ message: 'Password Is Not Correct' }));
                    }
                } else {
                    return res.status(400).send(JSON.stringify({ message: 'User Not Found' }));
                }
            })
            .catch(err => console.log(err));
};

exports.adminLogin = (req, res, next) => {
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
    console.log(room);
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
        .populate('hotel')
        .exec()
        .then(transactions => res.status(200).send(transactions))
        .catch(err => console.log(err));
};

const paging = (model, page) => {
    const startIndex = (page - 1) * 8;
    const endIndex = page * 8;

    const results = {};

    const totalResults = model.slice(startIndex, endIndex);
    results.page = page;
    results.results = totalResults;
    results.totalPage = Math.ceil(model.length / 8);

    return results
}

exports.adminFetchTransaction = (req, res, next) => {
    const page = req.query.page ? req.query.page : 1;
    Transaction
        .find()
        .populate('hotel')
        .exec()
        .then(transactions => {
            let results = paging(transactions, page);
            res.status(200).send(results);
        })
        .catch(err => console.log(err));
};

exports.adminFetchUsers = (req, res, next) => {
    User
        .find()
        .then(users => res.status(200).send(users))
        .catch(err => console.log(err));
}

exports.adminFetchLatestTransactions = (req, res, next) => {
    Transaction
        .find()
        .then(transactions => res.status(200).send(transactions.sort((a, b) => b.createAt - a.createAt).splice(0,8)))
        .catch(err => console.log(err));
}


