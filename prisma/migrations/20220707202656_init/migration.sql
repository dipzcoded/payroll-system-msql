-- DropForeignKey
ALTER TABLE `employeeallowance` DROP FOREIGN KEY `employeeallowance_allowanceId_fkey`;

-- DropForeignKey
ALTER TABLE `employeededuction` DROP FOREIGN KEY `employeededuction_deductionId_fkey`;

-- AddForeignKey
ALTER TABLE `employeededuction` ADD CONSTRAINT `employeededuction_deductionId_fkey` FOREIGN KEY (`deductionId`) REFERENCES `deduction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeeallowance` ADD CONSTRAINT `employeeallowance_allowanceId_fkey` FOREIGN KEY (`allowanceId`) REFERENCES `allowance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
