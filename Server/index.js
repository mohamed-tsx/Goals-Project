const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const goalRouter = require("./Routes/goalRoutes");
const userRoutes = require("./Routes/UserRoutes");
const { errorHandler } = require("./Middleware/ErrorHandler");
const connectDB = require("./config/db");

connectDB();

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Middleware for parsing application/json
app.use(express.json());

app.use(cors());

app.use("/api/goals", goalRouter);
app.use("/api/users", userRoutes);

//Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
