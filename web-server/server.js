const express = require('express');
const app = express();
const fs = require('fs');
const pg = require('pg')
const format = require('pg-format')

const PORT = 8080;

var config = {
    host : "db",
    user: "postgres", // name of the user account
    database: "postgres", // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

var pool = new pg.Pool(config)

// allow load static resources
app.use(express.static('dist'));
// disable http cache -> 
app.disable('etag');

app.get("/query/entries", function(request, response){
    console.log("queriying entries")
    pool.connect((err, client, done) => {
        if (err) throw err;
        console.log("connected to database");
        var query = format('SELECT * from posts');
        client.query(query, (err, result) => {
            if(err) throw err;
            console.log(result);
            response.send(result.rows);
        });
    });
});

app.listen(PORT);
console.log(`server listening by port ${PORT}`)
