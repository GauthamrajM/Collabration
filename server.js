//create express app
const exp=require("express");
const app=exp();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
const path = require("path");
require("dotenv").config()


//connecting with Angular
app.use(exp.static(path.join(__dirname,"./dist/project1")))

//conneting mongodb server
//import mongoClient
const mongoClient=require('mongodb').MongoClient;
const dburl=process.env.DBURL;

//connect to DB
mongoClient.connect(dburl)
.then((client)=>{
    //get database  object
    let databaseObject=client.db("Demo");
    //get collecetion objects
    let userCollectionObject=databaseObject.collection("usercollection");
    //share collection objects to APIs
    app.set("userCollectionObject",userCollectionObject)
    console.log("Connected to DB Successfully");
})
.catch(err=>console.log("err in connecting to Database",err));

//add body par
app.use(exp.json())

//if path is userlogin
app.use('/user/login',expressAsyncHandler(async(req,res)=>{
     //get userCollection Obj from req
     let userCollectionObject = req.app.get("userCollectionObject")
     //get user crederntials object
     let credObject = req.body;
     //search user by username
     let userOfDB = await userCollectionObject.findOne({username:credObject.username})
     //if user not found
     if(userOfDB===null){
         res.send({message:"Invalid username"})
     }   
     //if user existed, compare passwords 
     else{
         let status= await bcryptjs.compare(credObject.password,userOfDB.password)
         //if passeord not matched
         if(status==false){
             res.send({message:"Invalid password"})
         }
         else{
             //create JWT token and encrypt it with a secret key
             let signedToken = jwt.sign({username:userOfDB.username},"project",{expiresIn:20})
             //send encrypted JWT tojen as res
             res.send({message:"login success",token:signedToken,user:userOfDB})
         }
     }
    })
)

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/project1/index.html'),err=>{
        if(err){
            next(err)
        }
    })
})

//handling invalid paths
app.use((req,res,next)=>{
    res.status(404).send({message:`The path ${req.url} does not exist`})
})

//handling errors
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

//assign PORT Number
const PORT = 3010 || process.env.PORT;
app.listen(PORT,()=>console.log(`Http Server Listing at ${PORT}`));