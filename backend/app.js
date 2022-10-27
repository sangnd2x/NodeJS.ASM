const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5500;

const movieRoute = require('./routes/movie');

// cors set up
app.use(cors());
app.use(express.json({
    type: ['application/json']
}));

app.use(bodyParser.urlencoded({ extended: false }));

// movie route
app.use(movieRoute);

// handling endpoint error
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
})

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));