let express = require('express');
let axios = require('axios');
let redis = require('redis');
let port = process.env.PORT || 4200;
let app = express();

const client = redis.createClient({
    host:'localHost',
    port:6379
})

app.get('/data',function(req,res){
    let userInput = (req.query.country).trim();
    userInput = userInput?userInput:'India';
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`
    //Check data in redis 
    return client.get(`${userInput}`,function(err,result){
        //if data is on redis 
        if(result){
            const output = JSON.parse(result);
            res.send(output);
        }else{
            //as data is not in redis make api call get data and save in redis
            axios.get(url)
            .then(response => {
                //save the response in redis for next time 
                const output = response.data;
                client.setex(`${userInput}`,3600,JSON.stringify({source:'Redis Cache',output}))
                //for first for new key

                res.send({source:'Api Response',output})
            })

        }
    }) 

})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})