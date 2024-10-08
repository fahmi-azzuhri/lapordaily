const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");
const {
  generateToken,
  verifyPassword,
  authenticate,
  authorize,
} = require("./auth/auth");

const app = express();
const prisma = new PrismaClient();
const laporanRouter = require("./laporan/laporanRouter");

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan("combined"));

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const token = generateToken(user);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
});

// Endpoint untuk menambah user baru oleh admin
app.post(
  "/admin/add-user",
  authenticate,
  authorize(["ADMIN"]),
  async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { username, password: hashedPassword, role },
      });

      res.json({ id: user.id, username: user.username, role: user.role });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat menambahkan user" });
    }
  }
);

// Endpoint untuk membuat akun admin (hanya untuk setup awal)
app.post("/create-admin", async (req, res) => {
  try {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (existingAdmin) {
      return res.status(400).json({ error: "Admin account already exists" });
    }

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    res.json({ message: "Admin account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating admin account" });
  }
});

// Endpoint untuk mendapatkan semua user
app.get("/users", authenticate, authorize(["ADMIN"]), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data user" });
  }
});

// Endpoint untuk mendapatkan user berdasarkan ID
app.get("/user/:id", authenticate, authorize(["ADMIN"]), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    res.json({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data user" });
  }
});

//Endpoint untuk menghapus user
app.delete(
  "/user/:id",
  authenticate,
  authorize(["ADMIN"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = parseInt(id);

      console.log("ID yang diterima untuk dihapus:", userId); // Log untuk debugging

      if (isNaN(userId)) {
        return res.status(400).json({ error: "ID tidak valid" });
      }

      // Cek apakah user yang akan dihapus ada
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ error: "User tidak ditemukan" });
      }

      // Hapus user dari database
      await prisma.user.delete({
        where: { id: userId },
      });

      res.json({ message: "User berhasil dihapus" });
    } catch (error) {
      console.error("Error saat menghapus user:", error);
      res.status(500).json({ error: "Terjadi kesalahan saat menghapus user" });
    }
  }
);

// Endpoint untuk mengubah password user yang sudah login
app.put("/user/update-password", authenticate, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Dapatkan user dari token yang terverifikasi
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Cek apakah user ditemukan
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Verifikasi password lama
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password lama tidak sesuai" });
    }

    // Hash password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password di database
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    res.json({ message: "Password berhasil diubah" });
  } catch (error) {
    console.error("Error saat mengubah password:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengubah password" });
  }
});

// Endpoint untuk laporan
app.use("/api", authenticate, authorize(["ADMIN", "USER"]), laporanRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
