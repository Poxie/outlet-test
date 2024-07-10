/*
  Warnings:

  - Added the required column `saturdayOpenHours` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sundayOpenHours` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekdayOpenHours` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `store` ADD COLUMN `saturdayOpenHours` VARCHAR(191) NOT NULL,
    ADD COLUMN `sundayOpenHours` VARCHAR(191) NOT NULL,
    ADD COLUMN `weekdayOpenHours` VARCHAR(191) NOT NULL;
