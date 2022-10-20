import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import mongoose from 'mongoose';
import path from 'path';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { router } from "./routes/auth.js";
dotenv.config();


const app = express();
const SERVER_PORT = parseInt(process.env.SERVER_PORT ?? 2022) ;
const SERVER_URL = process.env.SERVER_URL ?? `http://localhost:${SERVER_PORT}`;
const MONGO_URL = process.env.MONGO_URL ?? '';
const API_KEY = process.env.API_KEY;
const CLIENT_URL = process.env.CLIENT_URL;
const CLIENT_PORT = process.env.CLIENT_PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(MONGO_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

app.use(helmet());
app.use(cors(
    {
        origin: CLIENT_URL,
        credentials: true
    }
))

app.use(express.json());

app.use((req, res, next) => {
    console.log("Request received");
    console.log(req.body);
    next();
});

app.use("/api/auth", router);







app.get("/", (req, res) => {
    res.send("Hello World!");
});

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        credentials: true
    }

});

io.on("connect", socket => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`Socket server running on port ${SERVER_URL}`);
}
);