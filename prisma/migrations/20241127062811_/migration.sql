/*
  Warnings:

  - Added the required column `createdAt` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "accessTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "verification" ADD COLUMN     "createdAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);
