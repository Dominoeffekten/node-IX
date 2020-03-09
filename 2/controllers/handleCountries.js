"use strict";
const mon = require("./mongoose");

exports.getCountries = async function (res, url) { //henter data omkring country
    if(url == "country"){
        try {
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
    let chk = { name: req.body.name }; 
    
    if (req.body.localname === "") country.localname = country.name;
    console.log(req.body);
    try {
        mon.Country.create({
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
        });





        res.redirect("/");
    } catch (e) {
        console.log(e);
    }
}