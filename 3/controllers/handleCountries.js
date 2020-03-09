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
    } else if(url == "continent"){
        try {
            let country = await mon.retrieve("localhost", "world", "country", {}, {'name': 1});
            let continent = await mon.retrieve("localhost", "world", "continent", {}, {'name': 1});
            let lang = await mon.retrieve("localhost", "world", "language", {}, {'name': 1});

            res.render('continent', {
                title: 'Fragments of the World',
                subtitle: 'Select continent',
                cons: continent,
                countries: country,
                langs: lang
            });
        } catch (e) {
            console.log(e);
        }
    } else if(url == "lang"){
        try {
            let all = await mon.dub("localhost", "world", "countrylanguage",{'language': 1}, { $group: {language: "$language"}} );

            //let di = await mon.dis("localhost", "world", "countrylanguage", "language" );
            let lang = await mon.retrieve("localhost", "world", "countrylanguage", {}, {'language': 1});   
            console.log(lang);
            console.log(all);
            //console.log(di);
            res.render('lang', {
                title: 'Fragments of the World',
                subtitle: 'Find a language',
                la: lang,
                a: all
             
            });
        } catch (e) {
            console.log(e);
        }
    } else if(url == "city"){
        try {
            let city = await mon.retrieve("localhost", "world", "city", {}, {'name': 1});
            res.render('city', {
                title: 'Fragments of the World',
                subtitle: 'Select City',
                cities: city
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
exports.postStuff = async function (res, body, url, req) {
    if(url == "city"){
        try {
           // console.log(body);
           var arr =[];
           /*
           let ci = await mon.retrieve("localhost", "world", "city", {}, {'name': 1});

           for (let c of ci) {
            var name = c.name;
            arr.push(name);
        }*/
            let city = await mon.dub("localhost", "world", "city", {$match: {name: body}});   
            console.log(city);
            console.log(arr);

            res.render('cityDisplay', {
                title: 'Fragments of the World',
                subtitle: 'Show my city',
                cities: city,
            });
        } catch (e) {
            console.log(e);
        }
    } else if(url == "continent"){
        try {
            var arr = [];
            let continent = await mon.retrieve("localhost", "world", "continent", {}, {'name': 1});
            let country = await mon.retrieve("localhost", "world", "country", {continent: body}, {'country': 1});        
            let lang = await mon.retrieve("localhost", "world", "countrylanguage", {}, {'countrycode': 1});
            
           // console.log(country);

            for (let count of country) {
                var pop = count.population;
                var code = count.code;
                console.log(code + pop);
            }
            for (let langs of lang) {
                var sprog = langs.language;
                var per = langs.percentage;
                
                if(arr[sprog]){
                    arr[sprog] += (per * pop)/100;
                } else{
                    arr[sprog] = (per * pop)/100;
                }
            }
            //console.log(arr);

            


            res.render('continentDisplay', {
                title: 'Fragments of the World',
                subtitle: 'Select a continent and see its languages',
                cons: continent,
                countries: country,
                arr
            });
        } catch (e) {
            console.log(e);
        }
    }
}
