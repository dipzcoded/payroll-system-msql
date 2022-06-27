-- DropForeignKey
ALTER TABLE `salarylevel` DROP FOREIGN KEY `salaryLevel_salaryGradeId_fkey`;

-- DropForeignKey
ALTER TABLE `salarystep` DROP FOREIGN KEY `salaryStep_salaryLevelId_fkey`;

-- DropForeignKey
ALTER TABLE `salarystepnotch` DROP FOREIGN KEY `salarystepnotch_salaryStepId_fkey`;

-- AddForeignKey
ALTER TABLE `salaryLevel` ADD CONSTRAINT `salaryLevel_salaryGradeId_fkey` FOREIGN KEY (`salaryGradeId`) REFERENCES `salaryGrade`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salaryStep` ADD CONSTRAINT `salaryStep_salaryLevelId_fkey` FOREIGN KEY (`salaryLevelId`) REFERENCES `salaryLevel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salarystepnotch` ADD CONSTRAINT `salarystepnotch_salaryStepId_fkey` FOREIGN KEY (`salaryStepId`) REFERENCES `salaryStep`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
