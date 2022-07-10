-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_paySlipId_fkey`;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_paySlipId_fkey` FOREIGN KEY (`paySlipId`) REFERENCES `payslip`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
