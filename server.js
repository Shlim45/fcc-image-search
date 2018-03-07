import { googleSearch, reduceImages } from './modules/';

// init project
const express = require('express');
// const mongoose = require('mongoose');
// const fetch = require("node-fetch");
 
const app = express();
// const GOOGLE_URI = process.env.GOOGLE_URI;

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/api/imagesearch/:query", function (req, res) {
  const query = req.params.query;
  const offset = req.query.offset ? req.query.offset : 10;
  
  const results = googleSearch(query, offset)
    .then(images => res.json(reduceImages(images)))
    .catch(err => console.error(err));  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
