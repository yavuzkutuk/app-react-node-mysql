// Framework express
const express = require('express');
// Module Cors
const cors = require('cors');
// Connection à Mysql
const { db } = require ('./db');
// On fait appel à la classe
const app = express();
const PORT = 3001;
app.use(cors());

app.get('/movies', (req, res) => {
    const { movie } = req.query;
    if(movie){
        db.query(`SELECT * FROM movies WHERE name LIKE '%${movie}%'`, (error, result) => {
            if(error) throw err;
            res.json(result);
        })
    }else{
        db.query('SELECT * FROM movies', (error, result) => {
            if(error) throw err;
            res.json(result);
        })
    }
});

app.get('/', (req, res) => {
    res.send({message: 'Mon app'});
});
app.listen(PORT, () => {
 console.log('le serveur tourne');
});