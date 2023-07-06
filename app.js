const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")
const app=express();
app.use(express.static("public2"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")

});

app.post("/",function(req,res){
const firstname=req.body.fname;
const lastname=req.body.lname;
const emailname=req.body.email;

console.log(firstname);

const data={
    members:[
        {
        email_address:emailname,
        status:"subscribed",
        merge_fields:{
            FNAME:firstname,
            LNAME:lastname
        }
    }
]  
};

const jsonData=JSON.stringify(data);
 url="https://us12.api.mailchimp.com/3.0/lists/44cb6ee2fa";

const options={
method:"POST",
auth:"abheek1:e5d68e90a415980e8dcb65c164165bdd-us12"
} 

const request=https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data",function(data){
    console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
console.log("Server running on port 3000");
});




//e5d68e90a415980e8dcb65c164165bdd-us12
//44cb6ee2fa.