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
  modCountry.getCountry(res, req.body.ctry);
});

router.get('/countryDisplay', function(req, res, next) {
  modCountry.getCountry(res, req.body.ctry.value);
});

router.get('/countryData', function(req, res, next) {
  var url = req.url.substring(1);
  modCountry.getCountries(res, url);
});

router.post('/countryData', function(req, res, next) {
  modCountry.postCountry(req, res, next);
});

module.exports = router;
