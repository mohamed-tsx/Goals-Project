const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

// app.use("/auth", authRoutes); // Use the authentication routes under the '/auth' prefix

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
