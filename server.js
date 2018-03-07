const { googleSearch, reduceImages } = require('./modules/');
const Term = require('./models/term');

// init project
const express = require('express');
const mongoose = require('mongoose');
 
const app = express();

const URL = process.env.MONGOLAB_URI;
mongoose.connect(URL);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/api/imagesearch/:term", function (req, res) {
  const term = req.params.term;
  const offset = req.query.offset ? req.query.offset : 1;
  
  googleSearch(term, offset)
    .then(images => res.json(reduceImages(images)))
    .catch(err => {
      console.error(err);
      res.send('<h2 style="text-align: center">Error with request, try again</h2>');
    });
  
  Term.create({term, "when": Date.now()}, function(err, newTerm) {
    if (err) {
      console.error('Term', err);
      return;
    }
    console.log(newTerm);
  });
});

app.get("/api/latest/imagesearch/", function (req, res) {
  Term.find({}, function(err, terms) {
    if (!err){ 
        res.json(terms.reduce((acc, term) => {
          const query = term.term;
          const {when} = term;
          return [...acc, {"term":query, when}];
        }, []).sort((a, b) => a.when > b.when));
    } else {
      console.error(err);
      throw err;
    }
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
