import dotenv from "dotenv";
dotenv.config();

import configureExpress from "./config/express.js";
import corsConfig from "./config/cors.js";
import logger from "./config/morgan.js";
import connectDB from "./config/database.js";

import authRoutes from "./routes/auth.routes.js";
// import listRoutes from "./routes/list.routes.js";

// import { requireAuth } from "./middleware/requireAuth.middleware.js";
// import errorHandler from "./middleware/errorHandler.middleware.js"; // optional, we'll create it

const app = configureExpress();

// ─────── Global Middleware ───────
app.use(corsConfig);
app.use(logger);

app.use("/api/auth", authRoutes);

// // ─────── Protected Routes (require JWT) ───────
// app.use("/api", requireAuth); // Protects everything under /api
// app.use("/api/lists", listRoutes);
// // app.use("/api/user", requireAuth, userRoutes); // when you add user profile routes

// ─────── Health Check ───────
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// ─────── 404 Handler ───────
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     code: "notFound",
//     message: "Route not found",
//   });
// });

// ─────── Global Error Handler ───────
// app.use(errorHandler);

// ─────── Start Server ───────
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
