// server.js
// where your node app starts

// init project
var express = require('express');
// var mongoose = require('mongoose');

var app = express();
const GOOGLE_URI = process.env.GOOGLE_URI;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

function googleSearch(term="", offset=10) {
  const url = GOOGLE_URI + "?q=" + term;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => console.log('fetched:', data))
    .catch(err => console.error(err));
}

app.get("/api/imagesearch/:query", function (req, res) {
  res.send("<h1>imagesearch</h1>");
  const query = req.url.replace("/api/imagesearch/", "");

  const term   = query.substring(0, query.lastIndexOf('?'));
  const offset = query.substring(query.lastIndexOf('=') + 1, query.length);
  console.log(term, offset);
  googleSearch(term);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
