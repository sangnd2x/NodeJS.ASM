const Hotel = require('../models/hotel');
const Room = require('../models/room');
const Transaction = require('../models/transaction');
const mongodb = require('mongodb');

// Fetch all available hotels in database to user and admin
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
                    console.log(hotels)
                    const results = hotels.filter(h => {
                        for (let i = 0; i < roomIds.length; i++){
                            if (h.rooms.includes(roomIds[i])) {
                                return h;
                            }
                        }
                    })
                    res.status(200).send(results);
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
};

exports.adminFetchHotel = (req, res, next) => {
    Hotel
        .find()
        .then(hotels => {
            res.statusCode = 200;
            res.send(hotels);
        })
        .catch(err => console.log(err));
}

exports.adminAddHotel = (req, res, next) => {
    const regex = /\n/;
    const { name, type, city, address, photos, rooms, cheapestPrice, distance, desc, title } = req.body;
    const featured = req.body.featured === 'true' ? true : false;

    Room
        .find({ title: { $in: rooms.split(regex) } })
        .then(rooms => {
                let roomIds = [];
                rooms.map(room => roomIds.push(room._id.toString()));
                const newHotel = new Hotel({
                    address: address,
                    cheapestPrice: cheapestPrice,
                    city: city,
                    desc: desc,
                    distance: distance,
                    featured: featured,
                    name: name,
                    photos: photos.split(regex),
                    rooms: roomIds,
                    title: title,
                    type: type
                });
                newHotel.save()
                    .then(result => res.status(200).send(JSON.stringify({message: 'Added New Hotel'})))
                    .catch(err => console.log(err));
            })
        .catch(err => console.log(err))
};

exports.adminDeleteHotel = (req, res, next) => {
    const id = req.body.id;
    console.log(id);
    Transaction
        .find({hotel:new mongodb.ObjectId(id)})
        .then(trans => {
            if (trans.length > 0) {
                res.status(400).send(JSON.stringify({message: 'Cannot Delete! There are unpaid transactions!'}))
            } else {
                Hotel
                    .findOne({ _id: id })
                    .then(hotel => {
                        hotel.delete();
                        res.status(200).send(JSON.stringify({ message: 'Hotel Deleted' }));
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};

exports.adminFetchRooms = (req, res, next) => {
    Room
        .find()
        .then(rooms => res.status(200).send(rooms))
        .catch(err => console.log(err));
};

exports.adminAddRoom = (req, res, next) => {
    const regex = /\n/;
    const { title, desc, price, maxPeople, hotel, rooms } = req.body;
    const newRoom = new Room({
        title: title,
        price: price,
        maxPeople: maxPeople,
        desc: desc,
        roomNumbers: rooms.split(regex)
    });
    newRoom
        .save()
        .then(result => {
            console.log(result.id)
            Hotel
                .findOne({name: hotel})
                .then(hotel => {
                    hotel.rooms.push(result.id);
                    hotel.save().then(result => console.log('Added new room to Hotel!'))
                })
        })
        .catch(err => console.log(err));
}

exports.adminDeleteRoom = (req, res, next) => {
    const {id} = req.body;
    console.log(id);
    Room
      .findOne({ _id: id })
      .then(room => {
        Transaction
          .find({ room: { $in: room.roomNumbers } })
          .then(trans => {
            if (trans.length > 0) {
              console.log(trans)
              res.status(400).send(JSON.stringify({message : 'Cannot delete room! There is unpaid transaction with this room!'}))
            } else {
              room.delete();
              res.status(200).send(JSON.stringify({ message: 'Room deleted' }));
            }
          })
      })
      .catch(err => console.log(err));
}

exports.adminEditHotel = (req, res, next) => {
    const { hotelId } = req.params;
    Hotel
        .findOne({ _id: hotelId })
        .then(hotel => {
            let results = {};
            results.hotel = hotel;
            Room
                .find({ _id: { $in: hotel.rooms } })
                .then(rooms => {
                    results.roomName = rooms.map(room => room.title);
                    res.status(200).send(results);
                })
        })
        .catch(err => console.log(err));
}

exports.postEditHotel = (req, res, next) => {
    const id = req.params.hotelId;
    console.log(id);
    const regex = /\n/;
    const { name, type, city, address, photos, rooms, cheapestPrice, distance, desc, title, featured } = req.body;
    console.log(city)
    Room
        .find({ title: { $in: typeof(rooms) == 'string' ? rooms.split(regex) : rooms } })
        .then(rooms => {
            let roomIds = [];
            rooms.map(room => {
                roomIds.push(room._id.toString());
            });  
            Hotel.findOne({ _id: id }).then(hotel => {
                hotel.name = name;
                hotel.type = type;
                hotel.city = city;
                hotel.address = address;
                hotel.photos = photos;
                hotel.rooms = roomIds;
                hotel.cheapestPrice = cheapestPrice;
                hotel.distance = distance;
                hotel.desc = desc;
                hotel.title = title;
                hotel.featured = featured;
                hotel.save()
                res.status(200).send(JSON.stringify({ message: 'Hotel Updated!' }));
            })
        })
        .catch(err => console.log(err))
};

exports.adminEditRoom = (req, res, next) => {
    const { roomId } = req.params;
    Room
        .findOne({ _id: roomId })
        .then(room => {
            res.status(200).send(room);
        })
        .catch(err => console.log(err));
}

exports.postEditRoom = (req, res, next) => {
    const { roomId } = req.params;
    const { title, desc, price, maxPeople, hotel, roomNumbers } = req.body;
    console.log(hotel);
    Room
      .findOne({ _id: roomId })
      .then(room => {
        room.title = title;
        room.price = price;
        room.maxPeople = maxPeople;
        room.desc = desc;
        room.roomNumbers = typeof(roomNumbers) === 'string' ? roomNumbers.split(',') : roomNumbers;
        room.save();
        res.status(200).send(JSON.stringify({ message: 'Room Updated!' }));
        Hotel
          .findOne({ name: hotel })
          .then(hotel => {
            if (!hotel.rooms.includes(roomId)) {
              hotel.rooms.push(room._id);
              hotel.save().then(result => console.log('Added new room to Hotel!'));
            } 
          });
      })
      .catch(err => console.log(err));
}

