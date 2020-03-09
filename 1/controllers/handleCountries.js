"use strict";
const mon = require("./mongoWrap");

exports.getCountries = async function (res, url) { //henter data omkring country
    if(url == "country"){
        try {
            let cs = await mon.retrieve("localhost", "world", "country", {}, {'name': 1});
            res.render('country', {
                title: 'Fragments of the World',
                subtitle: 'Select Country',
                countries: cs
            });
        } catch (e) {
            console.log(e);
        }
    } else if(url == "countryData"){
        try {
            let country = await mon.retrieve("localhost", "world", "country", {}, {'name': 1});
            let continent = await mon.retrieve("localhost", "world", "continent", {}, {'name': 1});
            let form = await mon.retrieve("localhost", "world", "governmentform", {}, {'name': 1});

            res.render('countryData', {
                title: 'Fragments of the World',
                subtitle: 'Select Country',
                countries: country,
                cons: continent,
                gforms: form
            });
        } catch (e) {
            console.log(e);
        }
    }
}

exports.getCountry = async function (res, ctryname) {
    try {
        let cs = await mon.retrieve("localhost", "world", "country", { "name": ctryname });
        console.log(cs);
        res.render('countryDisplay', {
            title: 'Fragments of the World',
            subtitle: ctryname,
            countries: cs
        });
    } catch (e) {
        console.log(e);
    }
}

exports.postCountry = async function (req, res, next) {
    let chk = { name: req.body.name };  // check object for existence
    let country = {                     // create obejct in db-format
        code: req.body.code,
        name: req.body.name,
        continent: req.body.continent,
        region: req.body.region,
        surfacearea: req.body.surfacearea,
        indepyear: req.body.indepyear,
        population: req.body.population,
        lifeexpectancy: req.body.lifeexpectancy,
        gnp: req.body.gnp,
        gnpold: req.body.gnpold,
        localname: req.body.localname,
        governmentform: req.body.governmentform,
        headofstate: req.body.headofstate,
        capital: null,
        code2: req.body.code2
    };
    if (req.body.localname === "") country.localname = country.name;
    console.log(req.body);
    try {
        let cs = await mon.upsert("localhost", "world", "country", country, chk);
        res.redirect("/");
    } catch (e) {
        console.log(e);
    }
}