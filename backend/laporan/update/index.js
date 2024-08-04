const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../../auth/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Endpoint untuk memperbarui laporan pekerjaan
router.put("/:id", authenticate, authorize(["ADMIN"]), async (req, res) => {
  const { id } = req.params;
  const { nama, jenisPekerjaan, hasil, tanggal } = req.body;
  try {
    const laporan = await prisma.laporanPekerjaan.update({
      where: { id: Number(id) },
      data: { nama, jenisPekerjaan, hasil, tanggal },
    });
    res.json(laporan);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui laporan" });
  }
});

module.exports = router;
