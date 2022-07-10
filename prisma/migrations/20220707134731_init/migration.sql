-- AlterTable
ALTER TABLE `payslip` MODIFY `status` INTEGER NULL,
    MODIFY `comment` VARCHAR(191) NULL,
    MODIFY `commentBy` VARCHAR(191) NULL,
    MODIFY `statusLevel` VARCHAR(191) NULL;
