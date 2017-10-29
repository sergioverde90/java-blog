const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors') // from https://github.com/expressjs/cors
const CONNECTION_HOLDER = require('./modules/postgres-connection');
const CORST_OPTIONS = require('./modules/cors-config');

const PORT = 8080;

// allow load static resources
app.use(express.static('dist'));
// disable http cache 
app.disable('etag');

app.get("/query/entries", cors(CORST_OPTIONS), function(request, response){
    console.log("querying all entries")
    var sql = 'SELECT * from posts order by d_date DESC';
    CONNECTION_HOLDER
        .query(sql, "error occuren when try to obtain all posts")
        .then(res =>  response.send(res.rows));
});

app.get("/query/entries/:id", cors(CORST_OPTIONS), function(request, response){
    const id = request.params.id;
    console.log(`querying entry with id ${id}`)
    const sql = `SELECT * from posts where id = ${id}`;
    CONNECTION_HOLDER
        .query(sql, `error when try to obtain the post with id ${id}`)
        .then(res => response.send(res.rows[0]));
});

app.listen(PORT);
console.log(`server listening on port ${PORT}`)
