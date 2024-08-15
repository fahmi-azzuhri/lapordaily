const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const cors = require("cors");
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
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
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
    const username = "admin";
    const password = "adminpassword"; // Ganti dengan password yang aman
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
app.use("/api", laporanRouter, authenticate, authorize(["ADMIN", "USER"]));
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
