const express = require("express");
const prisma = require("../utils/client");
const bcrypt = require("bcrypt");
const { auth, isAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, isAdmin, async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashed, role: "USER" },
  });
  res.json(user);
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json({ message: "User dihapus" });
});

module.exports = router;
