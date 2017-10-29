const pg = require('pg') // from https://node-postgres.com/
const format = require('pg-format')

const CONFIG = {
    host : "db",
    user: "postgres", // name of the user account
    password: "postgres",
    database: "postgres", // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
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
})(CONFIG);

// export closure as nodejs module
module.exports = CONNECTION_HOLDER;