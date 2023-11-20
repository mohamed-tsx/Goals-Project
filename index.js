const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

const goalRouter = require("./Routes/goalRoutes");
const { errorHandler } = require("./Middleware/ErrorHandler");

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Middleware for parsing application/json
app.use(express.json());

app.use("/api/goals", goalRouter);

//Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
