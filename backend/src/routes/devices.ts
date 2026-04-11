import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  const devices = await prisma.device.findMany({
    orderBy: { id: "asc" },
  });
  res.json(devices);
});

router.get("/light", async (_req, res) => {
  const device = await prisma.device.findFirst({
    where: { type: "light" },
  });

  if (!device) {
    return res.status(404).json({ message: "Light device not found" });
  }

  res.json(device);
});

router.get("/temperature-sensor", async (_req, res) => {
  const device = await prisma.device.findFirst({
    where: { type: "sensor" },
  });

  if (!device) {
    return res.status(404).json({ message: "Temperature sensor not found" });
  }

  res.json(device);
});

router.get("/camera", async (_req, res) => {
  const device = await prisma.device.findFirst({
    where: { type: "camera" },
  });

  if (!device) {
    return res.status(404).json({ message: "Camera device not found" });
  }

  res.json(device);
});

export default router;