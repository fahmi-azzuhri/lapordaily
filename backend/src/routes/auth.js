const express = require("express");
const prisma = require("../utils/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ message: "Username salah" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Password salah" });

  const token = jwt.sign(
    { id: user.id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Include user data in response
  res.json({
    token,
    username: user.username,
    role: user.role,
    id: user.id,
  });
});

module.exports = router;
