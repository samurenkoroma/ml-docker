const express = require('express')
const {connectDb} = require("./helpers/db");
const {port} = require("./configuration");
const app = express()
const startServer = () =>{
    app.listen(port, () => {
        console.log(`starting api service on port: ${port}`)
    })
}

app.get("/test", (req,res) => {
    res.send("api is working")
})

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .on("open", startServer)