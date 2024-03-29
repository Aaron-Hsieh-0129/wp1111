import server from './server';
/*
import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import wsConnect from './wsConnect';
import mongoose from 'mongoose'
import {v4 as uuidv4} from 'uuid';
*/
// import dotenv from 'dotenv-defaults';
import mongo from './mongo';

// dotenv.config();
mongo.connect();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});