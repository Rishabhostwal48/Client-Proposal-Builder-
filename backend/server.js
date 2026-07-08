const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const proposalRoutes = require("./routes/proposalRoute");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/proposal",proposalRoutes)

connectDB();
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
