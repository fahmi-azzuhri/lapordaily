const express = require("express");
const prisma = require("../utils/client");
const { auth } = require("../middleware/auth");
const router = express.Router();
const ExcelJS = require("exceljs");

// POST - Create new report
router.post("/", auth, async (req, res) => {
  try {
    const { tanggal, pekerjaan, nama } = req.body;

    // Validasi input
    if (
      !tanggal ||
      !pekerjaan ||
      !Array.isArray(pekerjaan) ||
      pekerjaan.length === 0
    ) {
      return res.status(400).json({
        error:
          "Data tidak lengkap. Tanggal dan minimal satu pekerjaan diperlukan.",
      });
    }

    // Validasi setiap pekerjaan
    for (let i = 0; i < pekerjaan.length; i++) {
      const { kategori, deskripsi, hasil, satuan } = pekerjaan[i];
      if (!kategori || !deskripsi || !hasil || !satuan) {
        return res.status(400).json({
          error: `Pekerjaan ${i + 1} tidak lengkap. Semua field harus diisi.`,
        });
      }
    }

    // Simpan setiap pekerjaan sebagai record terpisah
    const reports = [];
    for (const pekerjaanItem of pekerjaan) {
      const report = await prisma.report.create({
        data: {
          date: new Date(tanggal),
          name: nama || req.user.username,
          workType: pekerjaanItem.kategori,
          description: pekerjaanItem.deskripsi,
          result: parseInt(pekerjaanItem.hasil),
          unit: pekerjaanItem.satuan,
          userId: req.user.id,
        },
      });
      reports.push(report);
    }

    res.status(201).json({
      message: "Laporan berhasil disimpan",
      data: reports,
      count: reports.length,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat menyimpan laporan",
    });
  }
});

// GET - Admin: Get all user reports
router.get("/admin/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const reports = await prisma.report.findMany({
      orderBy: { date: "desc" },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    res.json({ data: reports });
  } catch (error) {
    console.error("Error fetching all reports:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil laporan semua user",
    });
  }
});

// GET - Get all reports for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;

    // Build where clause
    const whereClause = {
      userId: req.user.id,
    };

    // Add date filters if provided
    if (startDate || endDate) {
      whereClause.date = {};
      if (startDate) {
        whereClause.date.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.date.lte = new Date(endDate);
      }
    }

    // Get total count for pagination
    const total = await prisma.report.count({
      where: whereClause,
    });

    // Get reports with pagination
    const reports = await prisma.report.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });

    res.json({
      data: reports,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil data laporan",
    });
  }
});

// GET - Get reports grouped by date
router.get("/grouped", auth, async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "desc" },
    });

    // Group reports by date
    const groupedReports = reports.reduce((acc, report) => {
      const dateKey = report.date.toISOString().split("T")[0]; // Format: YYYY-MM-DD

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          name: report.name,
          pekerjaan: [],
        };
      }

      acc[dateKey].pekerjaan.push({
        id: report.id,
        kategori: report.workType,
        deskripsi: report.description,
        hasil: report.result,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      });

      return acc;
    }, {});

    // Convert to array and sort by date
    const result = Object.values(groupedReports).sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json({
      data: result,
      count: result.length,
    });
  } catch (error) {
    console.error("Error fetching grouped reports:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil data laporan",
    });
  }
});

// GET - Get single report by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id, // Ensure user can only access their own reports
      },
    });

    if (!report) {
      return res.status(404).json({
        error: "Laporan tidak ditemukan",
      });
    }

    res.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil data laporan",
    });
  }
});

// PUT - Update report
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { workType, description, result } = req.body;

    // Check if report exists and belongs to user
    const existingReport = await prisma.report.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (!existingReport) {
      return res.status(404).json({
        error: "Laporan tidak ditemukan",
      });
    }

    const updatedReport = await prisma.report.update({
      where: { id: parseInt(id) },
      data: {
        workType: workType || existingReport.workType,
        description: description || existingReport.description,
        result: result || existingReport.result,
      },
    });

    res.json({
      message: "Laporan berhasil diperbarui",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat memperbarui laporan",
    });
  }
});

// DELETE - Delete report
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if report exists and belongs to user
    const existingReport = await prisma.report.findFirst({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    if (!existingReport) {
      return res.status(404).json({
        error: "Laporan tidak ditemukan",
      });
    }

    await prisma.report.delete({
      where: { id: parseInt(id) },
    });

    res.json({
      message: "Laporan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat menghapus laporan",
    });
  }
});

router.get("/admin/export", auth, async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const { bulan, tahun, pekerjaan } = req.query;

    // Validasi bulan dan tahun
    if (!bulan || !tahun) {
      return res.status(400).json({ error: "Bulan dan tahun wajib diisi" });
    }

    const startDate = new Date(`${tahun}-${bulan}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const where = {
      date: {
        gte: startDate,
        lt: endDate,
      },
    };

    if (pekerjaan) {
      where.workType = pekerjaan;
    }

    const reports = await prisma.report.findMany({
      where,
      orderBy: { date: "asc" },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan");

    worksheet.columns = [
      { header: "Tanggal", key: "tanggal", width: 15 },
      { header: "User", key: "username", width: 20 },
      { header: "Kategori", key: "kategori", width: 20 },
      { header: "Deskripsi", key: "deskripsi", width: 30 },
      { header: "Hasil", key: "hasil", width: 15 },
      { header: "Satuan", key: "unit", width: 10 },
    ];

    reports.forEach((r) => {
      worksheet.addRow({
        tanggal: r.date.toISOString().split("T")[0],
        username: r.user.username,
        kategori: r.workType,
        deskripsi: r.description,
        hasil: r.result,
        unit: r.unit,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Laporan_${bulan}_${tahun}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ error: "Gagal mengekspor laporan" });
  }
});

// GET - Total laporan
router.get("/admin/total", auth, async (req, res) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Akses ditolak" });
    }

    const total = await prisma.report.count();
    res.json({ total });
  } catch (error) {
    console.error("Error getting total reports:", error);
    res.status(500).json({ error: "Gagal mengambil total laporan" });
  }
});

module.exports = router;
