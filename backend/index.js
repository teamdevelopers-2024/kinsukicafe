import express from "express";
import cors from "cors";
import path from "path";
import 'dotenv/config';
import router from "./Router.js";
import connectDB from "./database/connection.js";
// import favicon from 'serve-favicon';
// import { fileURLToPath } from 'url';

// Get the directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// CORS options
const corsOptions = {
  origin: ['https://sealand.vercel.app',"http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Ensure OPTIONS is included
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes


// Serve favicon
// app.use(favicon(path.join(__dirname, 'favicon.ico')));

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
