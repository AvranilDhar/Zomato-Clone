import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
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
}));
app.use('/api/auth',authRouter);
export default app;

