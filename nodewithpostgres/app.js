const express = require('express');
const app = express();
const port = 8700;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const Pool = require('pg').pool;
const pool = new Pool({
    user:'',
    host:'127.0.0.1',
    database:'postgres',
    port:'5432'
})


app.get('./',(req,res)=>{
    pool.query('SELECT * From employee',(err,result)=>{
        if(err) throw err;
        res.send(result.rows);
    })
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})