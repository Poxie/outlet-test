-- AlterTable
ALTER TABLE `ProductGroup` ADD COLUMN `groupType` ENUM('PRODUCT_GROUP', 'WEEKLY_PRODUCT') NOT NULL DEFAULT 'PRODUCT_GROUP';
