const express = require('express');
const cors = require('cors');
const app = express();
const twitGrabber = require('./services/twitter');

app.use(express.static(__dirname + '/Views'));

app.get('/', (req, res) => {
    // res.send('Twitter API client server is up and running.');
    res.sendFile('index.html');
});

app.get('/api/tweets/:keyword', twitGrabber.getTweets);

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
  };
app.use(cors(corsOption));

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Listening on port ${port}...`));