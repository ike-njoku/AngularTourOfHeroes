// this file enables the app to be run on heroku

const express = require('express');
const path = require('path');
const app = express();
app.use(express.stattic(__dirname + '/dist/angular-tour'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/angular-tour/index.html'));
});

app.listen(process.env.PORT || 8080);