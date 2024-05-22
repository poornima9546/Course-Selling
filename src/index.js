import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import connectDb from "../config/db";

const userRouter = require("../routes/index"); // Corrected variable name
const PORT = 3006;

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", userRouter);
connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})