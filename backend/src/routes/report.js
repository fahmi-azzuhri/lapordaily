const express = require("express");
const prisma = require("../utils/client");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { date, name, workType, description, result, unit } = req.body;
  const report = await prisma.report.create({
    data: {
      date: new Date(date),
      name,
      workType,
      description,
      result: parseInt(result),
      unit,
      userId: req.user.id,
    },
  });
  res.json(report);
});

router.get("/", auth, async (req, res) => {
  const reports = await prisma.report.findMany({
    where: { userId: req.user.id },
    orderBy: { date: "desc" },
  });
  res.json(reports);
});

module.exports = router;
