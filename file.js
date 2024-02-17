const fs = require("fs")
fs.readFile("./test.txt","utf-8",(err,result)=>{
    if(err){
        console.log("Error",err);
    }else{
        console.log(result)
    }
});

  fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString()  + "\n");