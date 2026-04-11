import { Router } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const router = Router();

const commandSchema = z.object({
  command: z.enum(["on", "off"]),
});

router.get("/commands", async (_req, res) => {
  const light = await prisma.device.findFirst({
    where: { type: "light" },
  });

  if (!light) {
    return res.status(404).json({ message: "Light device not found" });
  }

  const commands = await prisma.deviceCommand.findMany({
    where: { deviceId: light.id },
    orderBy: { createdAt: "desc" },
  });

  res.json(commands);
});

router.post("/commands", async (req, res) => {
  const parsed = commandSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const light = await prisma.device.findFirst({
    where: { type: "light" },
  });

  if (!light) {
    return res.status(404).json({ message: "Light device not found" });
  }

  const nextStatus = parsed.data.command === "on" ? "online" : "offline";

  const command = await prisma.deviceCommand.create({
    data: {
      deviceId: light.id,
      command: parsed.data.command,
      executed: true,
      executedAt: new Date(),
    },
  });

  await prisma.device.update({
    where: { id: light.id },
    data: {
      status: nextStatus,
      lastSeenAt: new Date(),
    },
  });

  res.status(201).json(command);
});

export default router;