let express = require('express');
let bodyParser = require('body-parser');
let fileUpload = require('express-fileupload');
const app = express();
const port = 9860;

//static file path 
app.use( express.static(__dirname + '/public'))
app.set('view engine', 'ejs');

///middleware
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/', function(req, res){
    res.render('index');
})

app.post('/profile',(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    const imageFile = req.files.yourImage;
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render('display',{title:req.body.iName,image:`${imageFile.name}`});
    })

    
})

app.listen(port,()=>{
    console.log('listening on port '+port);
})