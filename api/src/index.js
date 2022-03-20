const express = require('express')
const {connectDb} = require("./helpers/db");
const {port, authApiUrl} = require("./configuration");
const mongoose = require("mongoose");
const axios = require("axios")
const app = express()
const postSchema = new mongoose.Schema({
    name:String
})
const Post = mongoose.model("Post", postSchema)

const startServer = () =>{
    app.listen(port, () => {
        console.log(`starting api service on port: ${port}`)
    })
}


app.get("/test", (req,res) => {
    res.json({status: "ok"})
})

app.get("/test-current-user", (req,res) => {
    axios.get(`${authApiUrl}/api/current-user`)
        .then(
            response =>
                res.json({status: "ok", currentUser: response.data})
        )

})


connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .on("open", startServer)