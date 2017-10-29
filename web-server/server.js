const express = require('express');
const app = express();
const fs = require('fs');
const pg = require('pg') // from https://node-postgres.com/
const format = require('pg-format')
const cors = require('cors') // from https://github.com/expressjs/cors

const PORT = 8080;

const config = {
    host : "db",
    user: "postgres", // name of the user account
    database: "postgres", // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

const corsOptions = {
    origin: 'http://localhost:81',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const CONNECTION_HOLDER = (function(config){
    const pool = new pg.Pool(config); // https://www.npmjs.com/package/pg-pool
    return {
        query : function(sql, errorMessage = "default message") {
            return pool.connect().then(client => {
                return client.query(sql).then(res => {
                    client.release();
                    return res;
                })
                .catch(err => {
                    try { client.release(); } catch(err) { console.error("error when client was to be released. Maybe the client has already been released.")}
                    console.error(errorMessage + " = " + err);
                });
            }, err => {
                console.error("error occuren when try to connect = ", err);
                // TODO: Handle common message
            });
        }
    }
})(config);

// allow load static resources
app.use(express.static('dist'));
// disable http cache -> 
app.disable('etag');

app.get("/query/entries", cors(corsOptions), function(request, response){
    console.log("queriying entries")
    var sql = format('SELECT * from posts order by d_date DESC');
    CONNECTION_HOLDER
        .query(sql, "error occuren when try to obtain all posts")
        .then(res =>  response.send(res.rows));
});

app.get("/query/entries/:id", cors(corsOptions), function(request, response){
    const id = request.params.id;
    const sql = `SELECT * from posts where id = ${id}`;
    CONNECTION_HOLDER
        .query(sql, `error when try to obtain the post with id ${id}`)
        .then(res => response.send(res.rows[0]));
});

app.listen(PORT);
console.log(`server listening by port ${PORT}`)
