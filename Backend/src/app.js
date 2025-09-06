import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
const app = express();
app.use(express.json({
    limit:"10kb"
}));
app.use(express.urlencoded({
    extended: true,
    limit:"10kb"
}));
app.use(cookieParser());
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}))
export default app;

