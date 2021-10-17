const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const pool = require('./db')
const moment = require('moment')

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/note', async (req, res) => {
    try{
        const response = await pool.query('SELECT * FROM note');
        res.send(response.rows);
    }catch(e){
        console.log(e);
        res.send({message:'ERROR'}).status(500);
    }
    
})

app.get('/note/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const response = await pool.query(`SELECT * FROM note WHERE id_note = ${id}`);
        res.send(response.rows)
    }catch(e){
        console.log(e);
        res.send({message:'ERROR'}).status(500);
    }
})

app.post('/note', async (req, res) => {
    try{
        const {
            name,
            description
        } = req.body;

        const response = await pool.query(`INSERT INTO note("name","description") VALUES('${name}','${description}')`)
        res.send({message:'Note created'});
    }catch(e){
        console.log(e);
        res.send({message:'ERROR'}).status(500);
    }
})

app.put('/note/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {name,description} = req.body;
        await pool.query(`UPDATE note SET("name","description") = ('${name}','${description}')
            WHERE id_note=${id}
        `)
        const response = await pool.query(`SELECT * FROM note WHERE id_note = ${id}`);
        res.send(response.rows)
    }catch(e){
        console.log(e);
        res.send({message:'ERROR'}).status(500);
    }
})

app.delete('/note/:id', async (req, res) => {
   try{
    const {id} = req.params;
    await pool.query(`DELETE FROM note WHERE id_note=${id}`)
    res.send({message:'Note deleted'});
   }catch(e){
       console.log(e);
       res.send({message:'ERROR'}).status(500);
   }

})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})