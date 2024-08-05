const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../auth/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Endpoint untuk mendapatkan semua laporan pekerjaan
router.get(
  "/",
  authenticate,
  authorize(["USER", "ADMIN"]),
  async (req, res) => {
    try {
      const laporan = await prisma.laporanPekerjaan.findMany({
        include: {
          user: true, // Menyertakan informasi pengguna
        },
      });
      res.json(laporan);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil laporan" });
    }
  }
);

// Endpoint untuk mendapatkan laporan berdasarkan ID
router.get(
  "/:id",
  authenticate,
  authorize(["USER", "ADMIN"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const laporan = await prisma.laporanPekerjaan.findUnique({
        where: { id: Number(id) },
        include: {
          user: true, // Menyertakan informasi pengguna
        },
      });
      if (laporan) {
        res.json(laporan);
      } else {
        res.status(404).json({ error: "Laporan tidak ditemukan" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil laporan" });
    }
  }
);

module.exports = router;
