import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AddTaskRouter from "./router/AddTaskRouter";

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://checkflow-client-s1fd.vercel.app', 
  'http://localhost:3000'                    
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  
}));

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
