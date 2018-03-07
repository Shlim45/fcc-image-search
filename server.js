// server.js
// where your node app starts

// init project
const express = require('express');
// const mongoose = require('mongoose');
// const fetch = require("node-fetch");
const GoogleImages = require('google-images');
 
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

async function googleSearch(query, offset=10) {
  if (query.length <= 0) return;
  
  const client = new GoogleImages(process.env.GOOGLE_CSE, process.env.GOOGLE_KEY);
  
  const results = await client.search(query)
    .then(images => images)
    .catch(err => console.error(err));
  
  return results;
}

app.get("/api/imagesearch/:query", function (req, res) {
  res.send("<h1>imagesearch</h1>");
  
  const query = req.params.query;
  const offset = req.query.offset ? req.query.offset : 10;
  
  const results = googleSearch(query, offset);
    // .then(images => {
    //   // do stuff with image results
    // })
    // .catch(err => console.error(err));
  
  console.log(results);
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
