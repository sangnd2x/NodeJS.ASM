const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'userToken.json');

const getDataFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (!err) cb(JSON.parse(fileContent));
        else cd([]);
    });
}

module.exports = class User {
    static fetchAll(cb) {
        getDataFromFile(cb);
    }
}