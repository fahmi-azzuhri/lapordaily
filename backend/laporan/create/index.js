const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../auth/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Endpoint untuk menambah laporan pekerjaan
router.post(
  "/",
  authenticate,
  authorize(["USER", "ADMIN"]),
  async (req, res) => {
    try {
      const { nama, jenisPekerjaan, hasil, tanggal } = req.body;
      const laporan = await prisma.laporanPekerjaan.create({
        data: { nama, jenisPekerjaan, hasil, tanggal },
      });
      res.json(laporan);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menyimpan laporan" });
    }
  }
);

module.exports = router;
