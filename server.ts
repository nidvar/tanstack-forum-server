// --------------------
// Third-party imports
// --------------------
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// --------------------
// First-party imports
// --------------------
import profileRouter from "./routes/profileRoutes";
import router from "./routes/postRoutes";
import userRouter from "./routes/authRoutes";
import { connectDB } from "./config/db";

// --------------------
// Config
// --------------------
const app = express();
const PORT = process.env.PORT || 8000;

// Important for Render
const __dirnameResolved = path.resolve();

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// --------------------
// DB
// --------------------
connectDB();

// --------------------
// API Routes
// --------------------
app.use("/profile", profileRouter);
app.use("/posts", router);
app.use("/", userRouter);

// --------------------
// Serve frontend (ONLY in production)
// --------------------
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirnameResolved, "client");

  app.use(express.static(clientPath));

  // Express 5 SAFE catch-all
  app.use((req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
