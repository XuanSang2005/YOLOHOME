import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/logs", async (_req, res) => {
  const sensor = await prisma.device.findFirst({
    where: { type: "sensor" },
  });

  if (!sensor) {
    return res.status(404).json({ message: "Sensor device not found" });
  }

  const logs = await prisma.temperatureLog.findMany({
    where: { deviceId: sensor.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  res.json(logs);
});

router.get("/current", async (_req, res) => {
  const sensor = await prisma.device.findFirst({
    where: { type: "sensor" },
  });

  if (!sensor) {
    return res.status(404).json({ message: "Sensor device not found" });
  }

  const latest = await prisma.temperatureLog.findFirst({
    where: { deviceId: sensor.id },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) {
    return res.status(404).json({ message: "No temperature data found" });
  }

  res.json(latest);
});

export default router;