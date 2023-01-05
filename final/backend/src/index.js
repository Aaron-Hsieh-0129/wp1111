// import http from 'http'
// import express from 'express';
// import dotenv from 'dotenv-defaults'
// import mongoose from 'mongoose'
// import WebSocket from 'ws'
// import mongo from './mongo'
// import wsConnect from './wsConnect'
// import { v4 as uuidv4 } from 'uuid'

// mongo.connect();

// const app = express()
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })
// const db = mongoose.connection

// db.once('open', () => {
//     console.log("MongoDB connected!")
//     wss.on('connection', (ws) => { // ws: client-side websocket
//         // wsConnect.initData(ws)
//         // ws.id = uuidv4() // hash key
//         // ws.box = '';
//         // console.log(wss)
//         ws.onmessage = wsConnect.onMessage(wss, ws);
//     }); });

// const PORT = process.env.PORT || 4001;
// server.listen(PORT, () => {
//     console.log(`Server is up on port ${PORT}.`)
// })
import path from "path";
// import GraphQL server
import server from './server'
// import MongoDB connection
import mongo from './mongo';
import express from 'express';

mongo.connect();

const app = express();

// deployment
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4010;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
})