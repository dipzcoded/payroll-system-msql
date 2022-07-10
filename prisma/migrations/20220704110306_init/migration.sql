/*
  Warnings:

  - You are about to drop the column `empId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employeeBankAcctnumber` on the `employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[EMPID]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `EMPID` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `employee_empId_key` ON `employee`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `empId`,
    DROP COLUMN `employeeBankAcctnumber`,
    ADD COLUMN `EMPID` VARCHAR(191) NOT NULL,
    ADD COLUMN `employeeBankAcctNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employee_EMPID_key` ON `employee`(`EMPID`);
