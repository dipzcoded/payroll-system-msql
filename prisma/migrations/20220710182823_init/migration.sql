/*
  Warnings:

  - Made the column `paySlipId` on table `voucher` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_paySlipId_fkey`;

-- AlterTable
ALTER TABLE `voucher` MODIFY `paySlipId` INTEGER NOT NULL;
