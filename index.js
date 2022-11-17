const express = require("express");
const mongodb = require('mongodb');
// const { MongoClient } = require("mongodb/mongodb");
const URL = "mongodb+srv://manivasagam:atshu.mani@cluster0.cn1yn6v.mongodb.net/?retryWrites=true&w=majority"
const { ppid } = require("process");
const app = express();
app.use(express.json());
const mongoclient =new mongodb.MongoClient(URL)
// const cors = require('cors')


app.get("/mentor",async(req,res)=>{
    try {
        let connection  =await mongoclient.connect();
        let db = connection.db("api link");
        let data =await db.collection("mentor").find({}).toArray();
        await connection.close();
        res.json(data);
    }
    catch(err){
        res.json({message:"error"})
    }
})


app.post("/createMentor",async(req,res)=>{
    try {
        let connection  =await mongoclient.connect();
        let db = connection.db("api link");
        let data =await db.collection("mentor").insertOne(req.body);
        await connection.close();
        res.json({message : "created"})
    }
    catch(err){
        res.json({message:"error"})
    }
})


console.log("started")
app.listen(process.env.PORT || 3005);
