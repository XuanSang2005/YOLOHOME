import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// phần code seed phía dưới giữ nguyên

async function main() {
  await prisma.cameraLog.deleteMany();
  await prisma.temperatureLog.deleteMany();
  await prisma.deviceCommand.deleteMany();
  await prisma.device.deleteMany();

  const light = await prisma.device.create({
    data: {
      name: "Living Room Light",
      type: "light",
      room: "Living Room",
      status: "online",
      ipAddress: "192.168.1.10",
      lastSeenAt: new Date(),
    },
  });

  const sensor = await prisma.device.create({
    data: {
      name: "Main Environment Sensor",
      type: "sensor",
      room: "Living Room",
      status: "online",
      ipAddress: "192.168.1.11",
      lastSeenAt: new Date(),
    },
  });

  const camera = await prisma.device.create({
    data: {
      name: "Front Door Camera",
      type: "camera",
      room: "Entrance",
      status: "online",
      ipAddress: "192.168.1.12",
      lastSeenAt: new Date(),
    },
  });

  await prisma.deviceCommand.createMany({
    data: [
      {
        deviceId: light.id,
        command: "on",
        executed: true,
        executedAt: new Date(),
      },
      {
        deviceId: light.id,
        command: "off",
        executed: true,
        executedAt: new Date(),
      },
    ],
  });

  await prisma.temperatureLog.createMany({
    data: [
      {
        deviceId: sensor.id,
        temperature: 28.5,
        humidity: 65,
        lightIntensity: 320,
        airQuality: 92,
      },
      {
        deviceId: sensor.id,
        temperature: 29.1,
        humidity: 63,
        lightIntensity: 350,
        airQuality: 90,
      },
      {
        deviceId: sensor.id,
        temperature: 27.9,
        humidity: 67,
        lightIntensity: 280,
        airQuality: 94,
      },
    ],
  });

  await prisma.cameraLog.createMany({
    data: [
      {
        deviceId: camera.id,
        event: "face_detected",
        faceLabel: "Unknown",
        note: "Movement detected near entrance",
      },
      {
        deviceId: camera.id,
        event: "camera_enabled",
        note: "Camera started successfully",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });