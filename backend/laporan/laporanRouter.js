const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Laporan Pekerjaan
router.post("/laporan", async (req, res) => {
  try {
    const { tanggal, nama, jenisPekerjaan, deskripsi, hasil, satuan } =
      req.body;
    const deskripsiString = deskripsi.join("|");

    const laporan = await prisma.laporanPekerjaan.create({
      data: {
        tanggal: new Date(tanggal),
        nama,
        jenisPekerjaan,
        deskripsi: deskripsiString,
        hasil,
        satuan,
      },
    });

    res.json({ success: true, message: "Data berhasil ditambahkan", laporan });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat menambahkan laporan" });
  }
});

// Read Laporan Pekerjaan (Semua)
router.get("/laporan", async (req, res) => {
  try {
    const laporan = await prisma.laporanPekerjaan.findMany();
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil laporan" });
  }
});

// Read Laporan Pekerjaan (Dibuat oleh User yang sedang login)
router.get("/laporan/me", async (req, res) => {
  try {
    // Mengambil nama dari token user yang sedang login
    const username = req.user.username;

    // Cari laporan pekerjaan yang dibuat oleh user tersebut
    const laporan = await prisma.laporanPekerjaan.findMany({
      where: { nama: username },
    });

    if (laporan.length === 0) {
      return res
        .status(404)
        .json({ error: "Tidak ada laporan yang ditemukan untuk user ini" });
    }

    res.json(laporan);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil laporan" });
  }
});

// Read Laporan Pekerjaan (Berdasarkan ID)
// router.get("/laporan/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const laporan = await prisma.laporanPekerjaan.findUnique({
//       where: { id: parseInt(id) },
//     });
//     if (!laporan) {
//       return res.status(404).json({ error: "Laporan tidak ditemukan" });
//     }
//     res.json(laporan);
//   } catch (error) {
//     res.status(500).json({ error: "Terjadi kesalahan saat mengambil laporan" });
//   }
// });

// Update Laporan Pekerjaan
router.put("/laporan/:id", async (req, res) => {
  const { id } = req.params;
  const { tanggal, nama, jenisPekerjaan, deskripsi, hasil, satuan } = req.body;
  try {
    const deskripsiString = deskripsi.join("|");
    const satuanString = satuan.join("|");
    const laporan = await prisma.laporanPekerjaan.create({
      data: {
        tanggal: new Date(tanggal),
        nama,
        jenisPekerjaan,
        deskripsi: deskripsiString,
        hasil,
        satuan: satuanString,
      },
    });
    res.json(laporan);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memperbarui laporan" });
  }
});

// Delete Laporan Pekerjaan
router.delete("/laporan/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.laporanPekerjaan.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Laporan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus laporan" });
  }
});

module.exports = router;
