/*
  Warnings:

  - Added the required column `productCount` to the `ProductGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ProductGroup` ADD COLUMN `productCount` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ProductGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
