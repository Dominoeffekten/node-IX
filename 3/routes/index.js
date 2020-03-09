var express = require('express');
var router = express.Router();
const modCountry = require("../controllers/handleCountries");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Fragments of the World',
    message: 'Just a piece of knowlege'
  });
});

/* GET continents page. */
router.get('/country', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountries(res, url);
});

router.post('/country', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountry(res, req.body.ctry);
});

router.get('/countryDisplay', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountry(res, req.body.ctry.value);
});

router.get('/countryData', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountries(res, url);
});

router.post('/countryData', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.postCountry(req, res, next);
});

// shows the languages spoken in xyz (continent
router.get('/continent', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountries(res, url);
});

router.post('/continent', function(req, res, next) {
  var url = req.url.substring(1);
  var body = req.body.continent;
  //console.log(req.body.continent);
  modCountry.postStuff(res, body, url, req);
});

// showing what cities have namesakes
router.get('/city', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountries(res, url);
});
router.post('/city', function(req, res, next) {
  var url = req.url.substring(1);
  var body = req.body.city;
  //console.log(req.body.city);
  modCountry.postStuff(res, body, url, req);
});
// shows the languages spoken in xyz (continent
router.get('/lang', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountries(res, url);
});




module.exports = router;
