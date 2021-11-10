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
app.use(express.json());

app.post('/movies', (req, res) => {
    const { name, description } = req.body;
    db.query(`INSERT INTO movies (name, description, status) VALUES ("${name}","${description}",1)`, (error, result) => {
        if(error) throw error;
        res.json(result);
    })
});

app.put('/movies/:id', (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;
    db.query(`UPDATE movies SET name="${name}", description="${description}" WHERE id=${id}`, (error, result) => {
        if(error) throw error;
        res.json(result);
    })
});


app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    db.query(`DELETE FROM movies WHERE id=${id}`, (error, result) => {
        if(error) throw error;
        res.json(result);
    })
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    db.query(`SELECT * FROM movies WHERE id = '${id}'`, (error, result) => {
        if(error) throw err;
        res.json(result);
    })
}); 

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