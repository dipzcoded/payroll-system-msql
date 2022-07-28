-- AlterTable
ALTER TABLE `payslip` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
