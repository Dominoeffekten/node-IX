"use strict";
/*
 * wrapper for CRUD functionality of a mongodb
 */
const mongo = require('mongodb');
const conparam = { useNewUrlParser: true, useUnifiedTopology: true};

exports.retrieve = async function(url, dbn, coll, query, sorts) {
    const constr = `mongodb://${url}:27017`;
    const con = await mongo.connect(constr, conparam);
    const db = con.db(dbn);
    let stuff = null;
    try {
        stuff = await db.collection(coll).find(query).sort(sorts).toArray();
    } catch(err) {
        console.log(error);
    } finally {
        con.close();
        return stuff;
    }
}

exports.upsert = async function(url, dbn, coll, query, chk) {
    const constr = `mongodb://${url}:27017`;
    const con = await mongo.connect(constr, conparam);
    const db = con.db(dbn);
    let stuff = null;
    try {
        stuff = await db.collection(coll).updateOne(chk, {"$set": query}, {upsert: true});
    } catch(err) {
        console.log(error);
    } finally {
        con.close();
        return stuff;
    }
}

exports.dub = async function(url, dbn, coll, sorts, key) {
    const constr = `mongodb://${url}:27017`;
    const con = await mongo.connect(constr, conparam);
    const db = con.db(dbn);
    let stuff = null;
    try {
        stuff = await db.collection(coll).sort(sorts).aggregate([  
            key 
        ]).toArray();
    } catch(err) {
        console.log(error);
    } finally {
        con.close();
        return stuff;
    }
}

exports.dis = async function(url, dbn, coll,  dist) {
    const constr = `mongodb://${url}:27017`;
    const con = await mongo.connect(constr, conparam);
    const db = con.db(dbn);
    let stuff = null;
    try {
        stuff = await db.collection(coll).distinct(dist).length;
    } catch(err) {
        console.log(error);
    } finally {
        con.close();
        return stuff;
    }
}
