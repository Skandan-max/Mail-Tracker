const express = require("express");
const cors = require("cors");
const path = require("path");
const { PORT } = require("./config");

const mailRoutes = require("./routes/mail");
const trackingRoutes = require("./routes/tracking");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", mailRoutes);
app.use("/api", trackingRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
