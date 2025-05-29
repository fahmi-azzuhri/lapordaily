-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2025 at 02:03 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_report`
--

-- --------------------------------------------------------

--
-- Table structure for table `laporanpekerjaan`
--

CREATE TABLE `laporanpekerjaan` (
  `id` int NOT NULL,
  `tanggal` datetime(3) NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenisPekerjaan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hasil` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporanpekerjaan`
--

INSERT INTO `laporanpekerjaan` (`id`, `tanggal`, `nama`, `jenisPekerjaan`, `deskripsi`, `hasil`, `satuan`) VALUES
(2, '2024-09-05 00:00:00.000', 'fahmi', 'Mesin MV', 'kupas kabel MV menggunakan mesin', '589', 'kg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2a$10$4F.4cmEaL7kBhiwZc/9NzOnGx.YzRFviWerF4kGR6xbhrlNZM3Kty', 'ADMIN'),
(2, 'fahmi', '$2a$10$EKOY1RU.mJW4D5M8mRNB1O8IvL2h1NMVapq0DZMVSaqRkvSZBOyxW', 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('4642c617-6466-44f8-b897-cead4329f8df', '6174455cf4e2ebedaf7ea5f1cb2a1f074fb404bc564ae2b3eba7e1b81396774a', '2024-09-16 07:35:28.529', '20240902155429_', NULL, NULL, '2024-09-16 07:35:27.530', 1),
('64edc683-907c-4685-900a-dc67f7703a02', 'bbddb251c560d57a7c610b92a9bc1094bf388248cffbdb4592c06d7680334a80', '2024-09-16 07:35:27.464', '20240810155045_a', NULL, NULL, '2024-09-16 07:35:26.243', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `laporanpekerjaan`
--
ALTER TABLE `laporanpekerjaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_username_key` (`username`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `laporanpekerjaan`
--
ALTER TABLE `laporanpekerjaan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
