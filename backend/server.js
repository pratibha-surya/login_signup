import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import authRoute from "./routes/UserRoute.js"
dotenv.config()
connectDB()


const app = express(); 

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth",authRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`);
});
