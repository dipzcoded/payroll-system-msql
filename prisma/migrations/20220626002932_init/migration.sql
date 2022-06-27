/*
  Warnings:

  - You are about to drop the column `created_at` on the `allowance` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `allowance` table. All the data in the column will be lost.
  - You are about to drop the column `account_number` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `bank_address` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `bank_email_address` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `bank_phone_no` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `approved_by` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `bank_name` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `bs_id` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `ceo_signature` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `is_approved` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `paid_by` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `sub_total` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `the_sum_of` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `bankschedule` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `deduction` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `deduction` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `contract_salary` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `emp_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_bank` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_bankacctnumber` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_type` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `join_date` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `notch_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `position_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `salary_level_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `salary_step_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `staff_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `allowance_id` on the `employeeallowance` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `employeeallowance` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `employeeallowance` table. All the data in the column will be lost.
  - You are about to drop the column `fee_type` on the `employeeallowance` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `employeeallowance` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `employeededuction` table. All the data in the column will be lost.
  - You are about to drop the column `deduction_id` on the `employeededuction` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `employeededuction` table. All the data in the column will be lost.
  - You are about to drop the column `fee_type` on the `employeededuction` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `employeededuction` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `monthlypayhead` table. All the data in the column will be lost.
  - You are about to drop the column `pay_type` on the `monthlypayhead` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `monthlypayhead` table. All the data in the column will be lost.
  - You are about to drop the column `allowance_total` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `comment_by` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `deduction_total` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `is_generated` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `is_generated_to_voucher` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `net_pay` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `net_salary` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `status_level` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `total_earnings` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `u_wallet` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `payslip` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `salarygrade` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `salarygrade` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `salarylevel` table. All the data in the column will be lost.
  - You are about to drop the column `salary_grade_id` on the `salarylevel` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `salarylevel` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `salarystep` table. All the data in the column will be lost.
  - You are about to drop the column `salary_level_id` on the `salarystep` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `salarystep` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `salarystepnotch` table. All the data in the column will be lost.
  - You are about to drop the column `salary_step_id` on the `salarystepnotch` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `salarystepnotch` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password_changed_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_expires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `signature_photo` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `bank_schedule_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `comment_by` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `is_generated` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `payment_type` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `payslip_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `process_done_as_schedule` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `status_level` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `voucher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[empId]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffId]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[salaryLevelId]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[salaryStepId]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[notchId]` on the table `employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paySlipId]` on the table `voucher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `allowance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankAddress` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankEmailAddress` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankPhoneNo` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BSID` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approvedBy` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ceoSignature` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theSumOf` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bankschedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `deduction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeBank` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeBankAcctnumber` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeType` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinDate` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notchId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryLevelId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryStepId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allowanceId` to the `employeeallowance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `employeeallowance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeType` to the `employeeallowance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `employeeallowance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductionId` to the `employeededuction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `employeededuction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feeType` to the `employeededuction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `employeededuction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payType` to the `monthlypayhead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `monthlypayhead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allowanceTotal` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentBy` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductionTotal` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netPay` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netSalary` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusLevel` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalEarnings` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `payslip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `salaryGrade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryGradeId` to the `salaryLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `salaryLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryLevelId` to the `salaryStep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `salaryStep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryStepId` to the `salarystepnotch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `salarystepnotch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordChangedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordResetExpires` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordResetToken` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signaturePhoto` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankScheduleId` to the `voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentBy` to the `voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paySlipId` to the `voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentType` to the `voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusLevel` to the `voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `voucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_notch_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_position_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_salary_level_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_salary_step_id_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `employee_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `employeeallowance` DROP FOREIGN KEY `employeeallowance_allowance_id_fkey`;

-- DropForeignKey
ALTER TABLE `employeeallowance` DROP FOREIGN KEY `employeeallowance_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `employeededuction` DROP FOREIGN KEY `employeededuction_deduction_id_fkey`;

-- DropForeignKey
ALTER TABLE `employeededuction` DROP FOREIGN KEY `employeededuction_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `payslip` DROP FOREIGN KEY `payslip_employee_id_fkey`;

-- DropForeignKey
ALTER TABLE `position` DROP FOREIGN KEY `position_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `salarylevel` DROP FOREIGN KEY `salaryLevel_salary_grade_id_fkey`;

-- DropForeignKey
ALTER TABLE `salarystep` DROP FOREIGN KEY `salaryStep_salary_level_id_fkey`;

-- DropForeignKey
ALTER TABLE `salarystepnotch` DROP FOREIGN KEY `salarystepnotch_salary_step_id_fkey`;

-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_bank_schedule_id_fkey`;

-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `voucher_payslip_id_fkey`;

-- DropIndex
DROP INDEX `employee_emp_id_key` ON `employee`;

-- DropIndex
DROP INDEX `employee_staff_id_key` ON `employee`;

-- AlterTable
ALTER TABLE `allowance` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `bank` DROP COLUMN `account_number`,
    DROP COLUMN `bank_address`,
    DROP COLUMN `bank_email_address`,
    DROP COLUMN `bank_phone_no`,
    DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `accountNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `bankAddress` VARCHAR(550) NOT NULL,
    ADD COLUMN `bankEmailAddress` VARCHAR(255) NOT NULL,
    ADD COLUMN `bankPhoneNo` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `bankschedule` DROP COLUMN `approved_by`,
    DROP COLUMN `bank_name`,
    DROP COLUMN `bs_id`,
    DROP COLUMN `ceo_signature`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_approved`,
    DROP COLUMN `paid_by`,
    DROP COLUMN `payment_method`,
    DROP COLUMN `payment_type`,
    DROP COLUMN `sub_total`,
    DROP COLUMN `the_sum_of`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `BSID` VARCHAR(191) NOT NULL,
    ADD COLUMN `approvedBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `bankName` VARCHAR(191) NOT NULL,
    ADD COLUMN `ceoSignature` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `paidBy` VARCHAR(191) NOT NULL DEFAULT 'Accountant',
    ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentType` VARCHAR(191) NOT NULL,
    ADD COLUMN `subTotal` INTEGER NOT NULL,
    ADD COLUMN `theSumOf` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `deduction` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `department` DROP COLUMN `created_at`,
    DROP COLUMN `is_active`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `contract_salary`,
    DROP COLUMN `created_at`,
    DROP COLUMN `department_id`,
    DROP COLUMN `emp_id`,
    DROP COLUMN `employee_bank`,
    DROP COLUMN `employee_bankacctnumber`,
    DROP COLUMN `employee_type`,
    DROP COLUMN `is_active`,
    DROP COLUMN `join_date`,
    DROP COLUMN `notch_id`,
    DROP COLUMN `position_id`,
    DROP COLUMN `salary_level_id`,
    DROP COLUMN `salary_step_id`,
    DROP COLUMN `staff_id`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `contractSalary` INTEGER NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `departmentId` INTEGER NOT NULL,
    ADD COLUMN `empId` VARCHAR(191) NOT NULL,
    ADD COLUMN `employeeBank` VARCHAR(191) NOT NULL,
    ADD COLUMN `employeeBankAcctnumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `employeeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `isCctive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `joinDate` DATETIME(3) NOT NULL,
    ADD COLUMN `notchId` INTEGER NOT NULL,
    ADD COLUMN `positionId` INTEGER NOT NULL,
    ADD COLUMN `salaryLevelId` INTEGER NOT NULL,
    ADD COLUMN `salaryStepId` INTEGER NOT NULL,
    ADD COLUMN `staffId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `employeeallowance` DROP COLUMN `allowance_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `employee_id`,
    DROP COLUMN `fee_type`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `allowanceId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `employeeId` INTEGER NOT NULL,
    ADD COLUMN `feeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employeededuction` DROP COLUMN `created_at`,
    DROP COLUMN `deduction_id`,
    DROP COLUMN `employee_id`,
    DROP COLUMN `fee_type`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deductionId` INTEGER NOT NULL,
    ADD COLUMN `employeeId` INTEGER NOT NULL,
    ADD COLUMN `feeType` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `monthlypayhead` DROP COLUMN `created_at`,
    DROP COLUMN `pay_type`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `payType` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `payslip` DROP COLUMN `allowance_total`,
    DROP COLUMN `comment_by`,
    DROP COLUMN `created_at`,
    DROP COLUMN `deduction_total`,
    DROP COLUMN `employee_id`,
    DROP COLUMN `is_generated`,
    DROP COLUMN `is_generated_to_voucher`,
    DROP COLUMN `net_pay`,
    DROP COLUMN `net_salary`,
    DROP COLUMN `status_level`,
    DROP COLUMN `total_earnings`,
    DROP COLUMN `u_wallet`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `allowanceTotal` INTEGER NOT NULL,
    ADD COLUMN `commentBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deductionTotal` INTEGER NOT NULL,
    ADD COLUMN `employeeId` INTEGER NOT NULL,
    ADD COLUMN `isGenerated` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isGeneratedToVoucher` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `netPay` INTEGER NOT NULL,
    ADD COLUMN `netSalary` INTEGER NOT NULL,
    ADD COLUMN `statusLevel` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalEarnings` INTEGER NOT NULL,
    ADD COLUMN `uWallet` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `position` DROP COLUMN `created_at`,
    DROP COLUMN `department_id`,
    DROP COLUMN `is_active`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `departmentId` INTEGER NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salarygrade` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salarylevel` DROP COLUMN `created_at`,
    DROP COLUMN `salary_grade_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `salaryGradeId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salarystep` DROP COLUMN `created_at`,
    DROP COLUMN `salary_level_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `salaryLevelId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salarystepnotch` DROP COLUMN `created_at`,
    DROP COLUMN `salary_step_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `salaryStepId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created_at`,
    DROP COLUMN `password_changed_at`,
    DROP COLUMN `password_reset_expires`,
    DROP COLUMN `password_reset_token`,
    DROP COLUMN `signature_photo`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `passwordChangedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `passwordResetExpires` DATETIME(3) NOT NULL,
    ADD COLUMN `passwordResetToken` VARCHAR(255) NOT NULL,
    ADD COLUMN `signaturePhoto` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `bank_schedule_id`,
    DROP COLUMN `comment_by`,
    DROP COLUMN `created_at`,
    DROP COLUMN `is_generated`,
    DROP COLUMN `payment_type`,
    DROP COLUMN `payslip_id`,
    DROP COLUMN `process_done_as_schedule`,
    DROP COLUMN `status_level`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `bankScheduleId` INTEGER NOT NULL,
    ADD COLUMN `commentBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isGenerated` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `paySlipId` INTEGER NOT NULL,
    ADD COLUMN `paymentType` VARCHAR(191) NOT NULL,
    ADD COLUMN `processDoneAsSchedule` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `statusLevel` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employee_empId_key` ON `employee`(`empId`);

-- CreateIndex
CREATE UNIQUE INDEX `employee_staffId_key` ON `employee`(`staffId`);

-- CreateIndex
CREATE UNIQUE INDEX `employee_userId_key` ON `employee`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `employee_salaryLevelId_key` ON `employee`(`salaryLevelId`);

-- CreateIndex
CREATE UNIQUE INDEX `employee_salaryStepId_key` ON `employee`(`salaryStepId`);

-- CreateIndex
CREATE UNIQUE INDEX `employee_notchId_key` ON `employee`(`notchId`);

-- CreateIndex
CREATE UNIQUE INDEX `voucher_paySlipId_key` ON `voucher`(`paySlipId`);

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_salaryLevelId_fkey` FOREIGN KEY (`salaryLevelId`) REFERENCES `salaryLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_salaryStepId_fkey` FOREIGN KEY (`salaryStepId`) REFERENCES `salaryStep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_notchId_fkey` FOREIGN KEY (`notchId`) REFERENCES `salarystepnotch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeededuction` ADD CONSTRAINT `employeededuction_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeededuction` ADD CONSTRAINT `employeededuction_deductionId_fkey` FOREIGN KEY (`deductionId`) REFERENCES `deduction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeeallowance` ADD CONSTRAINT `employeeallowance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeeallowance` ADD CONSTRAINT `employeeallowance_allowanceId_fkey` FOREIGN KEY (`allowanceId`) REFERENCES `allowance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `position_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salaryLevel` ADD CONSTRAINT `salaryLevel_salaryGradeId_fkey` FOREIGN KEY (`salaryGradeId`) REFERENCES `salaryGrade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salaryStep` ADD CONSTRAINT `salaryStep_salaryLevelId_fkey` FOREIGN KEY (`salaryLevelId`) REFERENCES `salaryLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salarystepnotch` ADD CONSTRAINT `salarystepnotch_salaryStepId_fkey` FOREIGN KEY (`salaryStepId`) REFERENCES `salaryStep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payslip` ADD CONSTRAINT `payslip_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_paySlipId_fkey` FOREIGN KEY (`paySlipId`) REFERENCES `payslip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_bankScheduleId_fkey` FOREIGN KEY (`bankScheduleId`) REFERENCES `bankschedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
