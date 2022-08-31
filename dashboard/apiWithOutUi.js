const express = require("express");
const mongo = require("mongodb");
const app = express();
const port = process.env.PORT || 8200;
const MongoClient = mongo.MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoUrl = "mongodb://localhost:27017";
let db;
let col_name = "dashboard";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get("/health",(req,res)=>{
    res.status(200).send('Health Ok');
})

//Get user
app.get('/user',(req,res)=>{
    let query = {}
    if(req.query.role && req.query.city){
        query = {role:req.query.role,city:req.query.city,isActive:true}
    }else  if(req.query.city){
        query = {city:req.query.city,isActive:true}
    }else  if(req.query.role){
        query = {role:req.query.role,isActive:true}
    }
    else  if(req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive =="false"){
            isActive = false
        }else{
            isActive = true
        }
        query = {isActive}
    }
    else{
        query = {isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//Add user
app.post('/addUser',(req,res)=>{
    db.collection(col_name).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Data Added")
    })
})


MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("Error While Connecting");
    db = client.db("server");
    app.listen(port,(err)=>{
        console.log(`Server Running on ${port}`)
    })
})