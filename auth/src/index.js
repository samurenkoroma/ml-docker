const express = require('express')
const {connectDb} = require("./helpers/db");
const {port, apiUrl} = require("./configuration");
const app = express()
const axios = require("axios")

const startServer = () =>{
    app.listen(port, () => {
        console.log(`starting auth service on port: ${port}`)
    })
}

app.get("/test", (req,res) => {
    res.send("auth is working")
})

app.get("/api/current-user", (req,res) => {
    res.json({
        id: 1234,
        email: "foo@gmail.com"
    })
})
app.get("/test-data", (req,res) => {
    axios.get(`${apiUrl}/test`)
        .then(response =>res.json({status: "ok", currentUser: response.data}))
        .catch(console.log)
})

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .on("open", startServer)