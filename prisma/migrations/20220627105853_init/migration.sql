-- CreateTable
CREATE TABLE `basePay` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstGrossPay` BIGINT NOT NULL DEFAULT 35000,
    `secondGrossPay` BIGINT NOT NULL,
    `thirdGrossPay` BIGINT NOT NULL,
    `fourthGrossPay` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
