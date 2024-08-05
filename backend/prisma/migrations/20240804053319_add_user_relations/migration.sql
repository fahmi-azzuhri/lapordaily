/*
  Warnings:

  - You are about to alter the column `hasil` on the `laporanpekerjaan` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `userId` to the `LaporanPekerjaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporanpekerjaan` ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `hasil` VARCHAR(191) NOT NULL,
    ALTER COLUMN `tanggal` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` MODIFY `role` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `LaporanPekerjaan` ADD CONSTRAINT `LaporanPekerjaan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
