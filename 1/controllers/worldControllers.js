const mongo = require('mongodb');
const dbname = "world";
const constr = `mongodb://localhost:27017`;

module.exports = {
    retrieveCountry(req, res, next){
        mongo.connect(constr, { useNewUrlParser: true, useUnifiedTopology: true}, function (err, cor) {
            if (err) {
                console.error(err);
                return;
            }
            cor.db(dbname).collection('country').find().toArray(function (err, data) {
                if (err) throw err
                console.log(data);
                
                res.render('country', { 
                    title: 'Country',
                    data
                });
            });
        });
    },
    retrieveCountryData(req, res, next){
        var url = req.url.substring(9);
        query = {name: url}
        mongo.connect(constr, { useNewUrlParser: true, useUnifiedTopology: true}, function (err, cor) {
            if (err) {
                console.error(err);
                return;
            }
            cor.db(dbname).collection('country').find(query).toArray(function (err, data) {
                if (err) throw err
                console.log(data);
                
                res.render('country', { 
                    title: 'Country',
                    data
                });
            });
        });
    },
    insertCountry(req, res, next){
        query = { name: req.body.name }
        newData = {
            name: req.body.name,
            continent: req.body.continent,
            area: req.body.area,
            population: req.body.population,
            governmentForm: req.body.governmentForm
        }
        console.log(req.body);
        
        mongo.connect(constr, { useNewUrlParser: true, useUnifiedTopology: true}, function (err, cor) {
            if (err) {
                console.error(err);
                return;
            }
            cor.db(dbname).collection('country').updateOne(query, {"$set": newData}, {upset: true}, function(err, data){
                if (err) {throw err}
                //console.log(collection);
                res.render('country', { 
                    title: 'New country',
                    data: newData,
                });
            });
        });
    }
}