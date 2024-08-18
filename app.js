const express = require("express");
const app = express()
const path =  require("path")

app.set('view engine' , "ejs")

const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io")
const io = socketIo(server)


const usernames = []
const userids = []


io.on("connection" , function(socket){
    socket.on("username", function(username){
        userids.push(socket.id);
        usernames.push(username);

        socket.emit("sethogya")
    })

    socket.on("message" , function(message){
        io.emit("message" , {message , id : socket.id})
    } )
})
app.get("/" , (req, res)=>{
    res.render("index")
})

server.listen(3000)