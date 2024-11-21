/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropTable
DROP TABLE "Appointment";

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'default',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
