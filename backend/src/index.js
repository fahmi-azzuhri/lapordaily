const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/setup", require("./routes/setup"));
app.use("/users", require("./routes/user"));
app.use("/reports", require("./routes/report"));

app.get("/", (req, res) => {
  res.send("Lapor Daily API 🚀");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
