const express = require('express')
const {connectDb} = require("./helpers/db");
const {port} = require("./configuration");
const mongoose = require("mongoose");
const app = express()

const postSchema = new mongoose.Schema({
    name:String
})
const Post = mongoose.model("Post", postSchema)

const startServer = () =>{
    app.listen(port, () => {
        console.log(`starting api service on port: ${port}`)
        const silence = new Post({name:"silence"})
        silence.save(function (err, savedPost){
            if(err) return console.error(err);
            console.log("posts", savedPost)
        })
        Post.find(function (err, posts){
            if(err) return console.error(err);
            console.log("posts", posts)
        })
    })
}


app.get("/test", (req,res) => {
    res.send("api is working")
})

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .on("open", startServer)