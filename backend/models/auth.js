const Users = require('./userToken');

module.exports.isAuthorized = (req, res, next) => {
    Users.fetchAll((users, error) => {
        const token = req.params.token;
        if (error) {
            return next(error);
        } else {      
            if (users.find(user => user.token === token)) {     
                return next();
            } else {
                let err = new Error('Not authorized');
                err.status = 401;
                return next(err);
            }
        }
    })
}
