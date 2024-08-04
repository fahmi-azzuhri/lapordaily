const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../auth/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Endpoint untuk menghapus laporan pekerjaan
router.delete("/:id", authenticate, authorize(["ADMIN"]), async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.laporanPekerjaan.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus laporan" });
  }
});

module.exports = router;
