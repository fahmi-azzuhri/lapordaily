const express = require("express");
const bcrypt = require("bcrypt");
const prisma = require("../utils/client");
const router = express.Router();

router.post("/setup-admin", async (req, res) => {
  const existing = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (existing) return res.status(403).json({ message: "Admin sudah ada" });

  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: { username, password: hashed, role: "ADMIN" },
  });

  res.json({
    message: "Admin dibuat",
    admin: { id: admin.id, username: admin.username },
  });
});

module.exports = router;
