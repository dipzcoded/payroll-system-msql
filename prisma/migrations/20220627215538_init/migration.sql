/*
  Warnings:

  - Added the required column `cola` to the `basePay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `basepay` ADD COLUMN `cola` INTEGER NOT NULL;
