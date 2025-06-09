import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AddTaskRouter from "./router/AddTaskRouter";

dotenv.config({
  path:"./env"
});

const app = express();

app.use(cors({
  origin:"https://checkflow-client-s1fd.vercel.app" ,
  methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders:['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders:['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials:true,
  preflightContinue:false,
}))
app.use(express.json());

app.use('/task', AddTaskRouter);

const PORT = process.env.PORT || 9000;
const uri = process.env.MONGO_URL;

mongoose.connect(uri as string)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
