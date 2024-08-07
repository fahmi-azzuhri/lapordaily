/*
  Warnings:

  - You are about to drop the `laporan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `laporan`;

-- CreateTable
CREATE TABLE `LaporanPekerjaan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `jenisPekerjaan` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `hasil` VARCHAR(191) NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
