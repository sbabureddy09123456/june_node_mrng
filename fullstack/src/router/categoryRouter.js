let express = require('express');

let categoryRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.mongoUrl;

function router(menu){ 
    categoryRouter.route('/')
        .get(function(req,res){
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(500).send('Error While Connecting')
                }else{
                    let dbObj = dc.db('june8');
                    dbObj.collection('category').find().toArray(function(err,result){
                        if(err){
                            res.status(203).send('Error While Fetching')
                        }else{
                            res.render('category',{title:'category page',data:result,menu})

                        }
                    }) 
                }
            })

    // res.send(category)
})

categoryRouter.route('/details')
.get(function(req,res){
    res.send("category details")
})

return categoryRouter;
}
module.exports =router;

