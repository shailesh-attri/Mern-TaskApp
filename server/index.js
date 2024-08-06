import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoute from "./Routes/user.route.js";
import taskRoute from "./Routes/task.route.js";
import taskRefRoute from "./Routes/taskRef.route.js";
import bodyParser from 'body-parser';
const app = express();



// Set up CORS globally for all routes


const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // Set credentials to true only if needed
};


app.use(cors(corsOptions));

// Other middleware and routes
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
const mongoDbConnection = async () => {

  try {
    const connectionInstance = await mongoose.connect("mongodb+srv://task_app:taskapp123@taskapp.ognjt3z.mongodb.net/TaskApp", {
      dbName: "TaskApp",
    });
    console.log("MongoDB connected successfully");
    console.log("MongoDb Host ID: " + connectionInstance.connection.host);
  } catch (error) {
    console.log("Couldn't connect to MongoDB", error.message);
  }
};
mongoDbConnection();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to TaskApp! Your server is running successfully");
});
app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);
app.use("/api/taskRef", taskRefRoute);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
