let fs=require("fs");

//Create a file
// fs.writeFile('myText.txt','second time testing',function(err){
//     console.log('Task Done');
// })

//Append A File

// fs.appendFile('myCode.txt','4 This is my code \n',function(err){
//     if(err) throw err;
//     console.log('File Appended')

// })
var a=[
    {"name":"Jhon"},
    {"name":"Amit"}

]

fs.appendFile('myFile.json',JSON.stringify(a),function(err){
    if(err) throw err;
    console.log('File Appended')

})