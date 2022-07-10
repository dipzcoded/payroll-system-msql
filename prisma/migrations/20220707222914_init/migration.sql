/*
  Warnings:

  - You are about to drop the column `payslipId` on the `employeeallowance` table. All the data in the column will be lost.
  - You are about to drop the column `payslipId` on the `employeededuction` table. All the data in the column will be lost.
  - Added the required column `allowances` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductions` to the `payslip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employeeallowance` DROP FOREIGN KEY `employeeallowance_payslipId_fkey`;

-- DropForeignKey
ALTER TABLE `employeededuction` DROP FOREIGN KEY `employeededuction_payslipId_fkey`;

-- AlterTable
ALTER TABLE `employeeallowance` DROP COLUMN `payslipId`;

-- AlterTable
ALTER TABLE `employeededuction` DROP COLUMN `payslipId`;

-- AlterTable
ALTER TABLE `payslip` ADD COLUMN `allowances` VARCHAR(191) NOT NULL,
    ADD COLUMN `deductions` VARCHAR(191) NOT NULL;
