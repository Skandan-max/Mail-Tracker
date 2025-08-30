const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.get("/track/open", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).send("Missing id parameter");

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const ua = req.headers["user-agent"] || "unknown";
    const time = new Date().toISOString();

    await db.addOpen(id, ip, ua, time);

    // 1x1 transparent pixel gif
    const img = Buffer.from(
      "R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
      "base64"
    );
    res.writeHead(200, {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });
    res.end(img);
  } catch (err) {
    res.status(500).send("Error logging open event");
  }
});

router.get("/logs", async (req, res) => {
  try {
    const rows = await db.getAllOpens();
    res.json(rows);
  } catch (err) {
    res.status(500).send("DB error");
  }
});

router.get("/report", async (req, res) => {
  try {
    const report = await db.getReport();
    res.json(report);
  } catch (err) {
    res.status(500).send("DB error");
  }
});

router.get("/clear", async (req, res) => {
  try {
    await db.clearAll();
    res.send("Tracking logs cleared!");
  } catch {
    res.status(500).send("DB error");
  }
});

module.exports = router;
