import express from "express";
import cors from "cors";
import path from "path";
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";

const app = express();

// CORS options
const corsOptions = {
  origin: [
    "https://kinsukicafe.vercel.app", // without trailing slash
    "http://localhost:5173"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://kinsukicafe.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes


// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Connect to the database
 connectDB();


// Health check route
app.get("/", async (req, res) => {
  try {
    res.status(200).json("Hello, working fine");
  } catch (error) {
    console.error("Error initializing app:", error);
    res.status(500).json({ error: "Initialization error" });
  }
});

// API routes
app.use('/api', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
