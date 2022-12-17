import server from './server';
/*
import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import wsConnect from './wsConnect';
import mongoose from 'mongoose'
import {v4 as uuidv4} from 'uuid';
*/
import dotenv from 'dotenv-defaults';
import mongo from './mongo';

dotenv.config();
mongo.connect();

/*
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        // TODO
        // ws.id = uuidv4();
        // ws.box = '';
        // ws.onmessage = wsConnect.onMessage(wss, ws);

        // wsConnect.initData(ws);
        ws.onmessage = wsConnect.onMessage(ws, wss.clients);
    });
});
*/

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});