import express from "express";
import cors from 'cors'; // Importing cors
import 'dotenv/config'; // Loads environment variables
import router from "./router/adminRouter.js";
import connectDB from "./database/connection.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use(express.urlencoded({ extended: true }));

// CORS options
const corsOptions = {
  origin: ['https://kinsukicafe.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Ensure OPTIONS requests are handled
app.options('*', cors(corsOptions));

// Use the router for API routes
app.use('/api', router);

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log(`Backend server is running on port ${PORT}`);
  }
});
