const express = require('express');
const app = express();
const cors = require('cors') // from https://github.com/expressjs/cors
const CORST_OPTIONS = require('./modules/cors-config');
const POST_READER = require('./modules/post-reader');

const POSTS_PER_PAGE = parseInt(process.env.POSTS_PER_PAGE) || 2;
const PORT = process.env.PORT || 8080;

// allow load static resources
app.use(express.static('dist'));
// disable http cache 
app.disable('etag');

app.get("/", cors(CORST_OPTIONS), (request, response) => {
    response.sendStatus(200);
});

app.get("/query/entries", cors(CORST_OPTIONS), function(request, response){
    const actPage = parseInt(request.query.page) || 0;
    console.log(actPage);
    const filesMetadata = POST_READER.getEntries(actPage, actPage + (POSTS_PER_PAGE - 1));
    response.send(filesMetadata);
});

app.get("/query/entries/:id", cors(CORST_OPTIONS), function(request, response){
    const id = parseInt(request.params.id);
    const file = POST_READER.getEntry(id);
    response.send(file);
});

app.get("/query/total-entries", cors(CORST_OPTIONS), function(request, response){
    const total = POST_READER.totalPosts();
    response.send({"total" : total}); // TODO: ver cómo sustituir esto por la nueva sintaxis de ES6
});

app.listen(PORT);
console.log(`server listening on port ${PORT}`)