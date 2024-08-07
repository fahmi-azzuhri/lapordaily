/*
  Warnings:

  - You are about to drop the column `userId` on the `laporanpekerjaan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `laporanpekerjaan` DROP FOREIGN KEY `LaporanPekerjaan_userId_fkey`;

-- AlterTable
ALTER TABLE `laporanpekerjaan` DROP COLUMN `userId`,
    ALTER COLUMN `tanggal` DROP DEFAULT;
