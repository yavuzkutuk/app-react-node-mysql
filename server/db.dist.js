const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'dbname',
});

db.connect((err)=> {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

module.exports = {
    db,
};
