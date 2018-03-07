const { googleSearch, reduceImages } = require('./modules/');

// init project
const express = require('express');
// const mongoose = require('mongoose');
 
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/api/imagesearch/:query", function (req, res) {
  const query = req.params.query;
  const offset = req.query.offset ? req.query.offset : 1;
  
  const results = googleSearch(query, offset)
    .then(images => res.json(reduceImages(images)))
    .catch(err => console.error(err));  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
