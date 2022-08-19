let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config() 
let port = process.env.PORT || 8790;

let categoryRouter =require("./src/router/categoryRouter")
let productRouter =require("./src/router/productRouter")
//middleware
//static file path
app.use(express.static(__dirname+'/public'));
//html file path
app.set('views','./src/views');
// view engine name
app.set('view engine','ejs');

//routes
app.get('/',function(req,res){
    // res.send("Hii From Default Route")
    res.render('index.ejs')
})

app.use('/category', categoryRouter);
app.use('/products', productRouter);

// app.get('/category',function(req,res){
//     res.send(category)

// })
// app.get('/products',function(req,res){
//     res.send(products)

// })

//Create server
app.listen(port,function(err){
    if(err) throw err;
    console.log("Listening on port"+port)
})