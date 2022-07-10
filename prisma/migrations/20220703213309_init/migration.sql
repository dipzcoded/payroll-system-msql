-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_departmentId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_notchId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_positionId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_salaryLevelId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_salaryStepId_fkey`;

-- AlterTable
ALTER TABLE `employee` MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `nationality` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `dob` DATETIME(3) NULL,
    MODIFY `mobile` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `departmentId` INTEGER NULL,
    MODIFY `employeeBank` VARCHAR(191) NULL,
    MODIFY `employeeBankAcctnumber` VARCHAR(191) NULL,
    MODIFY `employeeType` VARCHAR(191) NULL,
    MODIFY `joinDate` DATETIME(3) NULL,
    MODIFY `notchId` INTEGER NULL,
    MODIFY `positionId` INTEGER NULL,
    MODIFY `salaryLevelId` INTEGER NULL,
    MODIFY `salaryStepId` INTEGER NULL;

-- AlterTable
ALTER TABLE `employeeallowance` ADD COLUMN `payslipId` INTEGER NULL;

-- AlterTable
ALTER TABLE `employeededuction` ADD COLUMN `payslipId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `position`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_salaryLevelId_fkey` FOREIGN KEY (`salaryLevelId`) REFERENCES `salaryLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_salaryStepId_fkey` FOREIGN KEY (`salaryStepId`) REFERENCES `salaryStep`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_notchId_fkey` FOREIGN KEY (`notchId`) REFERENCES `salarystepnotch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeededuction` ADD CONSTRAINT `employeededuction_payslipId_fkey` FOREIGN KEY (`payslipId`) REFERENCES `payslip`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeeallowance` ADD CONSTRAINT `employeeallowance_payslipId_fkey` FOREIGN KEY (`payslipId`) REFERENCES `payslip`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
