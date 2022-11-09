const Hotel = require('../models/hotel');
const Room = require('../models/room');
const mongodb = require('mongodb');

exports.fetchAll = (req, res, next) => {
    Hotel
        .find()
        .then(hotels => {
            res.statusCode = 200;
            res.send(hotels);
        })
        .catch(err => console.log(err));
};

exports.search = (req, res, next) => {
    const destination = req.body.destination.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const startDate = req.body.date[0].startDate;
    const endDate = req.body.date[0].endDate;
    const numberOfPeople = req.body.options.adult + req.body.options.children;
    const numberOfRoom = req.body.options.room;

    Room.find({ maxPeople: { $gte : numberOfPeople} })
        .then(rooms => {
            const roomIds = rooms.map(r => r._id.toString());
            Hotel.find({ city: destination })
                .then(hotels => {
                    const results = hotels.filter(h => {
                        for (let i = 0; i < roomIds.length; i++){
                            if (h.rooms.includes(roomIds[i])) {
                                return h;
                            }
                        }
                    })
                    res.send(results);
                })
        })
        .catch(err => console.log(err)); 
};

exports.fetchRoom = (req, res, next) => {
    const { id } = req.body;
    const { options } = req.body;
    const numberOfPeople = options.adult + options.children;
    Room
        .find({ _id: { $in: id} })
        .then(room => {
            res.status(200).send(room.filter(r => r.maxPeople = numberOfPeople));
        })
        .catch(err => console.log(err));
}