const express=require("express");
const https = require('node:https');

const app=express();

app.get("/",function(req,res){

    const url="https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=fcba146e16e25320a9872c2cd59a7a98"

https.get(url, (res) => {
console.log(res);   //This will return all the response from the api request    
console.log('statusCode:', res.statusCode);
console.log('headers:', res.headers);
      
res.on('data', (d) => {
    console.log(d); //This will return data in hexadecimal code
    process.stdout.write(d); //You can use this method or to print data in console use
    const weatherdata=JSON.parse(d);
    console.log(weatherdata);

    const temp=weatherdata.main.temp
    console.log(temp);    //only to extract temperature from the request

    const object={
        name:"Angela",
        favouritefood:"Ramen"
    }
    console.log(JSON.stringify(object));  //This will flat pack the json response
    res.write("Temp is"+weatherdata+"now");

});

}).on('error', (e) => {
    console.error(e);
  });

  res.write("Server is up and running");
res.send();
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000");
})