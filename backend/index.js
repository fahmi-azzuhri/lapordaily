const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const {
  generateToken,
  verifyPassword,
  authenticate,
  authorize,
} = require("./auth/auth");
const cors = require("cors");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Import dan gunakan router
const createLaporanRouter = require("./laporan/create/index");
const readLaporanRouter = require("./laporan/read/index");
const updateLaporanRouter = require("./laporan/update/index");
const deleteLaporanRouter = require("./laporan/delete/index");

// Endpoint untuk login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    const token = generateToken(user);
    res.json({ token });
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

// Gunakan router untuk endpoint CRUD laporan
app.use("/laporan/create", createLaporanRouter);
app.use("/laporan/read", readLaporanRouter);
app.use("/laporan/update", updateLaporanRouter);
app.use("/laporan/delete", deleteLaporanRouter);

// Endpoint sementara untuk membuat akun admin
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
