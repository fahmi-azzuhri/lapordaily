-- DropForeignKey
ALTER TABLE `laporanpekerjaan` DROP FOREIGN KEY `LaporanPekerjaan_userId_fkey`;

-- AlterTable
ALTER TABLE `laporanpekerjaan` ALTER COLUMN `tanggal` DROP DEFAULT,
    MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `LaporanPekerjaan` ADD CONSTRAINT `LaporanPekerjaan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
