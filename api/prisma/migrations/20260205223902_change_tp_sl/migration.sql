/*
  Warnings:

  - Made the column `tp` on table `Bot` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sl` on table `Bot` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bot" ALTER COLUMN "tp" SET NOT NULL,
ALTER COLUMN "tp" SET DEFAULT 0,
ALTER COLUMN "sl" SET NOT NULL,
ALTER COLUMN "sl" SET DEFAULT 0;
