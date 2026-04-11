-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "ip_address" TEXT,
    "last_seen_at" TIMESTAMP(3),

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_commands" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "command" TEXT NOT NULL,
    "executed" BOOLEAN NOT NULL DEFAULT false,
    "executed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_commands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temperature_logs" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "light_intensity" DOUBLE PRECISION,
    "air_quality" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "temperature_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "camera_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "device_id" INTEGER,
    "event" TEXT NOT NULL,
    "face_label" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "camera_logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "device_commands" ADD CONSTRAINT "device_commands_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temperature_logs" ADD CONSTRAINT "temperature_logs_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "camera_logs" ADD CONSTRAINT "camera_logs_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
