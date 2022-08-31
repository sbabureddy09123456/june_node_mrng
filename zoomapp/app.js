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

/// Details through post we can get the data
// app.post('/rest',(req,res)=>{
      
//     db.collection('zomato').find().toArray((err, data)=>{
//         // db.collection('Locations').find().toArray((err, data)=>{
//         if(err) throw err;
//         res.status(200).send(data);

//     })
// })

// Restaurants Details
app.get('/details/:id',(req,res)=>{
    //   let id = Number(req.params.id);
    let _id = mongo.ObjectId(req.params.id);
        db.collection('zomato').find({_id}).toArray((err, data)=>{
            // db.collection('Locations').find().toArray((err, data)=>{
            if(err) throw err;
            res.status(200).send(data);
    
        })
    })

// Menu Details
    app.get('/menu/:id',(req,res)=>{
          let id = Number(req.params.id);
        // let _id = mongo.ObjectId(req.params.id);
            db.collection('menu').find({restaurant_id:id}).toArray((err, data)=>{
                // db.collection('Locations').find().toArray((err, data)=>{
                if(err) throw err;
                res.status(200).send(data);
        
            })
        })



 // Menu Details with respect to ids { "id":[4,9,8]}
    app.post('/menuItem',(req,res)=>{
        // let id = Number(req.params.id);
      // let _id = mongo.ObjectId(req.params.id);
      console.log(req.body)
      if(Array.isArray(req.body.id)){

        db.collection('menu').find({menu_id:{$in:req.body.id}}).toArray((err, data)=>{
            // db.collection('Locations').find().toArray((err, data)=>{
            if(err) throw err;
            res.status(200).send(data);
    
        })
      }else{
        res.send("Please pass the Array");
      }
      })

      
 // Place order
    app.post('/placeOrder',(req,res)=>{
       
        db.collection('orders').insert(req.body,(err, data)=>{
            if(err) throw err;
            res.send("Order Placed");
        })
       
      })
      app.get('/order',(req,res)=>{
       let query ={}
       let email = req.query.email;
       if(email){
        query = {email:req.query.email}
       }
        db.collection('orders').find(query).toArray((err, data)=>{
            if(err) throw err;
            res.send(data);
        })
       
      })


      //Update Order
      app.put('/updateOrder',(req,res)=>{
        db.collection('orders').updateOne(
            {_id:mongo.ObjectId(req.body._id)},
            {
                $set:{
                    "status":req.body.status

                }
            },(err,result)=>{
               if(err) throw err;
               res.status(200).send("Status updated successfully")         
            }
        )

        
      })



      //Delete Order

      app.delete('/removeOrder',(req,res)=>{
        let id= mongo.ObjectId(req.body._id)
        db.collection('orders').find({_id:id}).toArray((err,result)=>{
            if(result.length!==0){
                db.collection('orders').deleteOne({_id:id}),(err,result) =>{
                    if(err) throw err;
                    res.send("Order Removed")
                }
            }else{
                res.send("Order Not Placed")
            }
        })
      })
//Filters

app.get('/filter/:mealId',(req,res)=>{
    let skip = 0;
    let limit = 10000;

    let query = {};
    let sort = {cost:1};
    let mealId =Number(req.params.mealId);
    let cuisineId =Number(req.query.cuisine);
    let lCost = Number(req.query.lCost);
    let hCost = Number(req.query.hCost);

    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if(req.query.skip && req.query.limit){
        skip = Number(req.query.skip);
        limit = Number(req.query.limit);
    }
    if(lCost && hCost && cuisineId){
        query ={
            'mealTypes.mealtype_id': mealId,
            $and:[{cost:{$gt:lCost,$lt:hCost}}],
            'cuisines.cuisine_id':cuisineId
        }
    } else if(lCost && hCost){
        query ={
            'mealTypes.mealtype_id': mealId,
            $and:[{cost:{$gt:lCost,$lt:hCost}}]
        }
    }else if(cuisineId){
        query ={
            'mealTypes.mealtype_id': mealId,
            'cuisines.cuisine_id':cuisineId
        }
    }

    db.collection('zomato').find(query).sort(sort).skip(skip).limit(limit).toArray((err, data)=>{
        // db.collection('Locations').find().toArray((err, data)=>{
        if(err) throw err;
        res.status(200).send(data);
    
    })
})




MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log('Error While Connecting');
    db=client.db('server'); //for local db
    // db=client.db('restaurants_data'); //for local db
    // db=client.db('Restaurants_Data'); //for live db
    app.listen(port,(err)=> {
        console.log("Server Listening on the port " + port);
    });


});


