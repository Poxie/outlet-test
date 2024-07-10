/*
  Warnings:

  - You are about to drop the column `adress` on the `store` table. All the data in the column will be lost.
  - Added the required column `address` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` DROP COLUMN `adress`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL;
