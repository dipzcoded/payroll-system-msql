-- DropIndex
DROP INDEX `voucher_paySlipId_key` ON `voucher`;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_paySlipId_fkey` FOREIGN KEY (`paySlipId`) REFERENCES `payslip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
