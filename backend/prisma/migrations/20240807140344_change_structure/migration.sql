/*
  Warnings:

  - Added the required column `deskripsiPekerjaan` to the `LaporanPekerjaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satuan` to the `LaporanPekerjaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporanpekerjaan` ADD COLUMN `deskripsiPekerjaan` VARCHAR(191) NOT NULL,
    ADD COLUMN `satuan` VARCHAR(191) NOT NULL,
    ALTER COLUMN `tanggal` DROP DEFAULT;
