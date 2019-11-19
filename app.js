const express = require('express');
const path = require('path');


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// routes init
const main = require('./routes');

app.use('/signup', main);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server started on port ${port}`));