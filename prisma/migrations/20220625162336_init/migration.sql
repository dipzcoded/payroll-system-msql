-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(191) NOT NULL DEFAULT 'https://res.cloudinary.com/dbrlwhrg6/image/upload/v1629941837/eventify/user_zg5yhl.png',
    `signature_photo` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'Employee',
    `password_changed_at` DATETIME(3) NOT NULL,
    `password_reset_token` VARCHAR(255) NOT NULL,
    `password_reset_expires` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `emp_id` VARCHAR(191) NOT NULL,
    `staff_id` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `contract_salary` INTEGER NULL,
    `employee_type` VARCHAR(191) NOT NULL,
    `join_date` DATETIME(3) NOT NULL,
    `employee_bank` VARCHAR(191) NOT NULL,
    `employee_bankacctnumber` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `department_id` INTEGER NOT NULL,
    `position_id` INTEGER NOT NULL,
    `salary_level_id` INTEGER NOT NULL,
    `salary_step_id` INTEGER NOT NULL,
    `notch_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employee_emp_id_key`(`emp_id`),
    UNIQUE INDEX `employee_staff_id_key`(`staff_id`),
    UNIQUE INDEX `employee_user_id_key`(`user_id`),
    UNIQUE INDEX `employee_salary_level_id_key`(`salary_level_id`),
    UNIQUE INDEX `employee_salary_step_id_key`(`salary_step_id`),
    UNIQUE INDEX `employee_notch_id_key`(`notch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employeededuction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fee_type` VARCHAR(191) NOT NULL,
    `fee` INTEGER NOT NULL,
    `remark` VARCHAR(255) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `deduction_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employeeallowance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fee_type` VARCHAR(191) NOT NULL,
    `fee` INTEGER NOT NULL,
    `remark` VARCHAR(255) NOT NULL,
    `employee_id` INTEGER NOT NULL,
    `allowance_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `department_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `department_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `position_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `allowance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `allowance_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deduction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `deduction_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthlypayhead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pay_type` VARCHAR(191) NOT NULL,
    `percentage` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `monthlypayhead_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `bank_address` VARCHAR(550) NOT NULL,
    `bank_email_address` VARCHAR(255) NOT NULL,
    `bank_phone_no` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bank_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salaryGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `salaryGrade_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salaryLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `salary_grade_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `salaryLevel_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salaryStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `salary_level_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `salaryStep_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `salarystepnotch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `salary_step_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payslip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `pension` INTEGER NOT NULL,
    `paye` INTEGER NOT NULL,
    `allowance_total` INTEGER NOT NULL,
    `total_earnings` INTEGER NOT NULL,
    `deduction_total` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `u_wallet` INTEGER NULL,
    `net_pay` INTEGER NOT NULL,
    `net_salary` INTEGER NOT NULL,
    `is_generated` BOOLEAN NOT NULL DEFAULT true,
    `status` INTEGER NOT NULL,
    `status_level` VARCHAR(191) NOT NULL,
    `is_generated_to_voucher` BOOLEAN NOT NULL DEFAULT false,
    `comment` VARCHAR(191) NOT NULL,
    `comment_by` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payslip_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `is_generated` BOOLEAN NOT NULL DEFAULT true,
    `remark` VARCHAR(191) NOT NULL DEFAULT 'Staff Salary',
    `month` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `status_level` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `comment_by` VARCHAR(191) NOT NULL,
    `payment_type` VARCHAR(191) NOT NULL,
    `process_done_as_schedule` BOOLEAN NOT NULL DEFAULT false,
    `bank_schedule_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `voucher_payslip_id_key`(`payslip_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bankschedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bs_id` VARCHAR(191) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `approved_by` VARCHAR(191) NOT NULL,
    `paid_by` VARCHAR(191) NOT NULL DEFAULT 'Accountant',
    `ceo_signature` VARCHAR(191) NOT NULL,
    `the_sum_of` VARCHAR(191) NOT NULL,
    `sub_total` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `is_approved` BOOLEAN NOT NULL DEFAULT false,
    `payment_type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_position_id_fkey` FOREIGN KEY (`position_id`) REFERENCES `position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_salary_level_id_fkey` FOREIGN KEY (`salary_level_id`) REFERENCES `salaryLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_salary_step_id_fkey` FOREIGN KEY (`salary_step_id`) REFERENCES `salaryStep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_notch_id_fkey` FOREIGN KEY (`notch_id`) REFERENCES `salarystepnotch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeededuction` ADD CONSTRAINT `employeededuction_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeededuction` ADD CONSTRAINT `employeededuction_deduction_id_fkey` FOREIGN KEY (`deduction_id`) REFERENCES `deduction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeeallowance` ADD CONSTRAINT `employeeallowance_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employeeallowance` ADD CONSTRAINT `employeeallowance_allowance_id_fkey` FOREIGN KEY (`allowance_id`) REFERENCES `allowance`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `position_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salaryLevel` ADD CONSTRAINT `salaryLevel_salary_grade_id_fkey` FOREIGN KEY (`salary_grade_id`) REFERENCES `salaryGrade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salaryStep` ADD CONSTRAINT `salaryStep_salary_level_id_fkey` FOREIGN KEY (`salary_level_id`) REFERENCES `salaryLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `salarystepnotch` ADD CONSTRAINT `salarystepnotch_salary_step_id_fkey` FOREIGN KEY (`salary_step_id`) REFERENCES `salaryStep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payslip` ADD CONSTRAINT `payslip_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_payslip_id_fkey` FOREIGN KEY (`payslip_id`) REFERENCES `payslip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_bank_schedule_id_fkey` FOREIGN KEY (`bank_schedule_id`) REFERENCES `bankschedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
