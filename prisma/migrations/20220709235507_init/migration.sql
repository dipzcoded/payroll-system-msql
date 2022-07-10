-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_bankScheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_paySlipId_fkey`;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_paySlipId_fkey` FOREIGN KEY (`paySlipId`) REFERENCES `payslip`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_bankScheduleId_fkey` FOREIGN KEY (`bankScheduleId`) REFERENCES `bankschedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
