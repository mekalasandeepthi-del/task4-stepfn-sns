import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startStepFunction } from "./stepfn.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/start-stepfn", async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    const response = await startStepFunction(phoneNumber, message);

    res.status(200).json({
      success: true,
      message: "SMS workflow started successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error starting Step Function:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start Step Function",
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});