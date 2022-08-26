let express = require('express');
let mongo = require('mongodb');
let app = express();
let MongoClient = mongo.MongoClient;
let dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
let mongoUrl = process.env.mongoUrl;
// let mongoUrl = process.env.mongoLiveUrl;

let cors = require('cors');
let port = process.env.PORT || 7100;
let db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

let authKey = process.env.authKey;
function auth(key){
    if(key === authKey) return true
    else return false
    
}
//get heart beat 
app.get('/', function(req, res) {
    res.status(200).send('Health Ok');

});

//location
app.get('/location',(req,res)=>{
    // let key = req.query.key;
    let key = req.header('x-basic-token');
    if(auth(key)){
            db.collection('location').find().toArray((err, data)=>{
            // db.collection('Locations').find().toArray((err, data)=>{
            if(err) throw err;
            res.status(200).send(data);
    
        })

    }else{
        res.send('unauthorized user')
    }
    
})

//restaurants
app.get('/restaurants',(req,res)=>{
    // let key = req.query.key;
    // let key = req.header('x-basic-token');
    // if(auth(key)){
        let query = {}
        let stateId= Number(req.query.stateId);
        let mealId= Number(req.query.mealId);
        if(mealId && stateId){
            query = {'mealTypes.mealtype_id': mealId,'state_id': stateId}
        }
        if(mealId){
            query = {'mealTypes.mealtype_id': mealId}
        }
        if(stateId){
            query = {'state_id': stateId}
        }
            db.collection('zomato').find(query).toArray((err, data)=>{
            // db.collection('Locations').find().toArray((err, data)=>{
            if(err) throw err;
            res.status(200).send(data);
    
        })

    // }else{
    //     res.send('unauthorized user')
    // }
    
})


//meal type
app.get('/mealType',(req,res)=>{
    
       
        db.collection('mealType').find().toArray((err, data)=>{
            // db.collection('Locations').find().toArray((err, data)=>{
            if(err) throw err;
            res.status(200).send(data);
    
        })

   
    
})

MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('Error While Connecting');
    db=client.db('restaurants_data'); //for local db
    // db=client.db('Restaurants_Data'); //for live db
    app.listen(port,(err)=> {
        console.log("Server Listening on the port " + port);
    });


});


