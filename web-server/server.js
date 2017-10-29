const express = require('express');
const app = express();
const fs = require('fs');
const pg = require('pg') // from https://node-postgres.com/
const format = require('pg-format')
const cors = require('cors') // from https://github.com/expressjs/cors

const PORT = 8080;

var config = {
    host : "db",
    user: "postgres", // name of the user account
    database: "postgres", // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var corsOptions = {
    origin: 'http://localhost:81',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

var pool = new pg.Pool(config); // https://www.npmjs.com/package/pg-pool

// allow load static resources
app.use(express.static('dist'));
// disable http cache -> 
app.disable('etag');

app.get("/query/entries", cors(corsOptions), function(request, response){
    console.log("queriying entries")
    pool.connect((err, client, done) => {
        if (err) throw err;
        console.log("connected to database");
        var query = format('SELECT * from posts');
        client.query(query, (err, result) => {
            if(err) throw err;
            response.send(result.rows);
        });
        client.release();
    });
});

app.get("/query/entries/:id", cors(corsOptions), function(request, response){
    const id = request.params.id;
    pool.connect((err, client, done) => {
        if (err) throw err;
        var query = format(`SELECT * from posts where id = ${id}`);
        client.query(query, (err, result) => {
            if(err) throw err;
            response.send(result.rows[0]);
        });
        client.release();
    });
});

app.listen(PORT);
console.log(`server listening by port ${PORT}`)
