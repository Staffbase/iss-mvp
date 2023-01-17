const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};



const helpers = require(`@staffbase/staffbase-plugin-sdk`).helpers;
const publicKeyPath = './key';
let keySecret;
let tempTokenData;

try {
	keySecret = helpers.readKeyFile(publicKeyPath);
    console.log(keySecret);
} catch (err) {
	console.log('Error Reading Key file', err);
}

const StaffBaseSSO = require('@staffbase/staffbase-plugin-sdk').sso;

//----------------------------JSON ROUTES--------------------------------------------------------------------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static

app.get('/', function (req, res) {
    const pluginId = 'staffbase.hrshowcase';
    const publicKey = keySecret;
    const jwtToken = req.query.jwt;
    let tokenData = null;
    
    try {
        let SSOContents = new StaffBaseSSO(pluginId, publicKey, jwtToken);
        tokenData = SSOContents.getTokenData();
        console.log('Received token data:', tokenData);
        tempTokenData = tokenData;
    } catch(tokenErr) {
         console.error('Error decoding token:', tokenErr);
    }
      if (req.query.jwt) {
         res.sendFile(path.join(__dirname, 'build', 'index.html'));
        // return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    //     return res.send({ express: tokenData});
        
      }
    // return res.send("Unable to open in Browser");
    });

    app.use('/', express.static(path.join(__dirname, 'build')));

    // app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
    // });


    app.get('/api/hf89wnf89hw938h98hw', (req, res) => {
        return res.send({ express: tempTokenData});
    });

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

//------------------------------------------------------------------------------------------------

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // TODO: frontent URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('access-control-expose-headers', 'content-disposition');
    next();
});

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


https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);


//----------------------------AUTH--------------------------------------------------------------------


// const helmet = require('helmet');

// app.use(function (req, res, next) {
//     res.setHeader(
//       'Content-Security-Policy',
//       "frame-ancestors 'self' http://iss-mvp-brazil.azurewebsites.net/ https://iss-mvp-brazil.azurewebsites.net/ http://staffbase.com localhost:*;"
//     );
//     next();
//   });

// app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));