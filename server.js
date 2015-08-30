var path = require('path');
var express = require('express');
var app = express();

const PORT = process.env.PORT || 8080; 

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/about.html');
})

var server = app.listen(PORT);