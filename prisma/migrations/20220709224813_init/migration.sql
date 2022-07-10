/*
  Warnings:

  - You are about to drop the column `allowances` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `deductions` on the `payslip` table. All the data in the column will be lost.
  - Added the required column `empAllowanceIds` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empDeductionIds` to the `payslip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payslip` DROP COLUMN `allowances`,
    DROP COLUMN `deductions`,
    ADD COLUMN `empAllowanceIds` VARCHAR(191) NOT NULL,
    ADD COLUMN `empDeductionIds` VARCHAR(191) NOT NULL;
