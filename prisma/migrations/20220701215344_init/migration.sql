-- AlterTable
ALTER TABLE `user` MODIFY `passwordChangedAt` DATETIME(3) NULL,
    MODIFY `passwordResetExpires` DATETIME(3) NULL,
    MODIFY `passwordResetToken` VARCHAR(255) NULL,
    MODIFY `signaturePhoto` VARCHAR(191) NULL;
