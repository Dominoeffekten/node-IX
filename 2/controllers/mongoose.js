"use strict";
/*
 * include more sophisticated mongodb functionality
 * mongoose enforces schemas, mongodb doesn't
 */
const mongoose = require("mongoose");

/*
 * create schema for database object
 * build corresponding model as an object
 * Wex19, lesson 14
 */
const continentSchema = mongoose.Schema ({
    continentType: String
});
const Continent = mongoose.model("Continent", continentSchema);

const governmentSchema = mongoose.Schema ({
    governmentType: String
});
const Government = mongoose.model("Government", governmentSchema);

const countrySchema = mongoose.Schema ({
    code: String,
    name: String,
    continent: String,
    region: String,
    surfacearea: Number,
    indepyear: Number,
    population: Number,
    lifeexpectancy: Number,
    gnp: Number,
    gnpold: Number,
    localname: String,
    governmentform: String,
    headofstate: String,
    capital: Number,
    code2: String
});
const Country = mongoose.model("country", countrySchema);

/*
 * connect to mongodb server
 */
const dbname = "world";
const constr = `mongodb://localhost:27017/${dbname}`;
const conparam = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(constr, conparam);
const db = mongoose.connection;
db.once("open", function() {
    console.log("Connected to server by mongoose")
}); 
// 
Country.create(
    {
        
    },
    function(error, savedDocument) {
        if (error) console.log(error);
        console.log(savedDocument);

        db.close();     // if forgotten batch job doesn't stop by itself

    }
);


