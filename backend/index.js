import express from "express";
import cors from "cors";
import 'dotenv/config';
import router from "./router.js"; // Adjust this path based on your structure
import connectDB from "../database/connection.js";

const app = express();

// CORS options
const corsOptions = {
  origin: ['https://sealand.vercel.app', "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

app.get('/', (req, res) => {
    res.status(200).json("Hello, working fine");
});

// API routes
app.use('/api', router);


// Export the app as the default export
export default app;
