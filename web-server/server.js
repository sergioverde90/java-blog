var express = require('express');
var app = express();
var fs = require('fs');
var mysql = require('mysql');

// allow load static resources
app.use(express.static('dist'));
// disable http cache -> 
app.disable('etag');
app.get('/', function(request, response){
    response.sendFile(__dirname + "/dist/index.html");
});

app.get('/entries', function(request, response){
    response.redirect("/");
});

app.get("/query/entries", function(request, response){
    var entries = _readEntries();
    response.status("200").send(entries);
});

app.get("/query/entries/:id", function(request, response){
    var id = request.params.id;
    var entries = _readEntries();
    var found = entries.find(el => el.id == id);
    if(!found) response.status("404").send("not found :(");
    response.status("200").send(found);
});

function _readEntries() {
    return JSON.parse(fs.readFileSync('./mock-entries.json', 'utf8'));
}

app.listen(8080);