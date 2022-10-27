const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'movieList.json');

const getDataFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (!err) cb(JSON.parse(fileContent));
        else cd([]);
    });
}

module.exports = class Movies {
    static fetchAll(cb) {
        getDataFromFile(cb);
    }
}

