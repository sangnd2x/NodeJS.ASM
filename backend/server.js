const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const hotelRoute = require('./routes/hotel');
const isAuthorized = require('./models/auth').isAuthorized;
const User = require('./models/user');

const server = express();

server.use(cors());
server.use(express.json({
    type: ['application/json']
}));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

// server.use(isAuthorized);
// (req, res, next) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     User
//         .find({username: username})
//         .then(user => {
//             if (user.length >  0) {
//                 if (user[0].password === password) {
//                     req.user = user[0];
//                     next();
//                 } else {
//                     res.statusCode = 404;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.write(JSON.stringify({ message: "Password is not correct" }));
//                     res.end();
//                 }
//             } else {
//                 res.statusCode = 404;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.write(JSON.stringify({ message: "User not found" }));
//                 res.end();
//             }
//         })
//         .catch(err => console.log(err));
// });

server.use(userRoute);
server.use(hotelRoute);


mongoose
    .connect('mongodb+srv://sang2x:sang123@cluster0.j1wx6nb.mongodb.net/asm?retryWrites=true&w=majority')
    .then(result => {
        server.listen(5000, () => console.log('Connected'));
    })
    .catch(err => console.log(err));