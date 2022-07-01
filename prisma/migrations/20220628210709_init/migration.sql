/*
  Warnings:

  - You are about to alter the column `subTotal` on the `bankschedule` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `pension` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `paye` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `allowanceTotal` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `deductionTotal` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `netPay` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `netSalary` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `totalEarnings` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `uWallet` on the `payslip` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `amount` on the `salarystep` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `amount` on the `salarystepnotch` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `amount` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `bankschedule` MODIFY `subTotal` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `basepay` MODIFY `firstGrossPay` DECIMAL(65, 30) NOT NULL DEFAULT 35000,
    MODIFY `secondGrossPay` DECIMAL(65, 30) NOT NULL,
    MODIFY `thirdGrossPay` DECIMAL(65, 30) NOT NULL,
    MODIFY `fourthGrossPay` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `payslip` MODIFY `pension` DECIMAL(65, 30) NOT NULL,
    MODIFY `paye` DECIMAL(65, 30) NOT NULL,
    MODIFY `allowanceTotal` DECIMAL(65, 30) NOT NULL,
    MODIFY `deductionTotal` DECIMAL(65, 30) NOT NULL,
    MODIFY `netPay` DECIMAL(65, 30) NOT NULL,
    MODIFY `netSalary` DECIMAL(65, 30) NOT NULL,
    MODIFY `totalEarnings` DECIMAL(65, 30) NOT NULL,
    MODIFY `uWallet` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `salarystep` MODIFY `amount` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `salarystepnotch` MODIFY `amount` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `voucher` MODIFY `amount` DECIMAL(65, 30) NOT NULL;
