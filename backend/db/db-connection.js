const mysql = require('mysql2');

let connection;

function getConnection() {
    if (!connection) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Nlakshan1999',
            database: 'notes_db'
        });
    }
    return connection;
}

module.exports = getConnection();