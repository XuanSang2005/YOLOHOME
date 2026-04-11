import express from "express";
import cors from "cors";

import devicesRouter from "./routes/devices";
import lightsRouter from "./routes/lights";
import temperatureRouter from "./routes/temperature";
import cameraRouter from "./routes/camera";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.use("/api/devices", devicesRouter);
app.use("/api/lights", lightsRouter);
app.use("/api/temperature", temperatureRouter);
app.use("/api/camera", cameraRouter);

export default app;