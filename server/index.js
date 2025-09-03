import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {connectDB} from "./config/db.js"
import { configDotenv } from "dotenv";
import {insertLeads} from "./utils/script.js"
configDotenv({path:".env"});
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
import passport from "./config/passport.js";


const app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());


const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow only requests from this origin
    methods: 'GET,POST, PUT, DELETE', // Allow only these methods
    credentials: true
};

app.use(cors(corsOptions));

connectDB();



// insertLeads();

import leadeRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoute.js"

app.use("/api/v1", leadeRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "index.html")); 
})



const PORT = process.env.PORT;
app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
})