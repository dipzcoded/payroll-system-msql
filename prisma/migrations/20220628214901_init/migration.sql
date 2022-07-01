/*
  Warnings:

  - You are about to alter the column `subTotal` on the `bankschedule` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `firstGrossPay` on the `basepay` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `secondGrossPay` on the `basepay` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `thirdGrossPay` on the `basepay` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `fourthGrossPay` on the `basepay` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to drop the column `isCctive` on the `employee` table. All the data in the column will be lost.
  - You are about to alter the column `fee` on the `employeeallowance` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fee` on the `employeededuction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `pension` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `paye` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `allowanceTotal` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `deductionTotal` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `netPay` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `netSalary` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `totalEarnings` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `uWallet` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `amount` on the `salarystep` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `amount` on the `salarystepnotch` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `amount` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `bankschedule` MODIFY `subTotal` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `basepay` MODIFY `firstGrossPay` DOUBLE NOT NULL DEFAULT 35000,
    MODIFY `secondGrossPay` DOUBLE NOT NULL,
    MODIFY `thirdGrossPay` DOUBLE NOT NULL,
    MODIFY `fourthGrossPay` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `isCctive`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `employeeallowance` MODIFY `fee` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `employeededuction` MODIFY `fee` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `payslip` MODIFY `pension` DOUBLE NOT NULL,
    MODIFY `paye` DOUBLE NOT NULL,
    MODIFY `allowanceTotal` DOUBLE NOT NULL,
    MODIFY `deductionTotal` DOUBLE NOT NULL,
    MODIFY `netPay` DOUBLE NOT NULL,
    MODIFY `netSalary` DOUBLE NOT NULL,
    MODIFY `totalEarnings` DOUBLE NOT NULL,
    MODIFY `uWallet` DOUBLE NULL;

-- AlterTable
ALTER TABLE `salarystep` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `salarystepnotch` MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `voucher` MODIFY `amount` DOUBLE NOT NULL;
