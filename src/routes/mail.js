const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const transporter = require("../utils/mailer");
const db = require("../db/database");
const { DOMAIN } = require("../config");

async function sendTrackedEmail(to, subject, text) {
  const id = crypto.randomUUID();
  const trackingPixel = `<img src="https://${DOMAIN}/track/open?id=${id}" width="1" height="1" style="display:none;" alt="" />`;
  const html = `<p>${text}</p>${trackingPixel}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });

  const sentTime = new Date().toISOString();
  await db.addEmail(id, to, subject, sentTime);
  return id;
}

router.post("/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    if (!to || !subject || !text)
      return res.status(400).json({ error: "Missing required fields" });

    const id = await sendTrackedEmail(to, subject, text);
    res.json({ message: "Email sent", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
