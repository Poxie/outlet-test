/*
  Warnings:

  - Added the required column `createdAt` to the `ProductGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductGroup` ADD COLUMN `createdAt` VARCHAR(191) NOT NULL;
