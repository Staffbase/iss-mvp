const express = require('express');
const path = require('path');

const app = express();
const port = 443;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // TODO: frontent URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('access-control-expose-headers', 'content-disposition');
    next();
});

// static
app.use('/', express.static(path.join(__dirname, 'build')));

// routes
app.get('/hw', (req, res) => res.send('Hello World!'));

// error handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token..');
    }
});

// run server
app.listen(port, () => console.log(`App listening on port ${port}!`));
