import { Router } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const router = Router();

const commandSchema = z.object({
  command: z.enum(["on", "off"]),
});

router.get("/logs", async (_req, res) => {
  const camera = await prisma.device.findFirst({
    where: { type: "camera" },
  });

  if (!camera) {
    return res.status(404).json({ message: "Camera device not found" });
  }

  const logs = await prisma.cameraLog.findMany({
    where: { deviceId: camera.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  res.json(logs);
});

router.post("/commands", async (req, res) => {
  const parsed = commandSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const camera = await prisma.device.findFirst({
    where: { type: "camera" },
  });

  if (!camera) {
    return res.status(404).json({ message: "Camera device not found" });
  }

  const nextStatus = parsed.data.command === "on" ? "online" : "offline";

  await prisma.device.update({
    where: { id: camera.id },
    data: {
      status: nextStatus,
      lastSeenAt: new Date(),
    },
  });

  const log = await prisma.cameraLog.create({
    data: {
      deviceId: camera.id,
      event: parsed.data.command === "on" ? "camera_enabled" : "camera_disabled",
      note: `Camera turned ${parsed.data.command}`,
    },
  });

  res.status(201).json(log);
});

export default router;