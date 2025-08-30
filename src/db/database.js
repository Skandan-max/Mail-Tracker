const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFile = path.join(__dirname, "../events.db");
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS emails (
      id TEXT PRIMARY KEY,
      recipient TEXT,
      subject TEXT,
      sentTime TEXT
    )`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS opens (
      id TEXT,
      ip TEXT,
      ua TEXT,
      time TEXT,
      FOREIGN KEY(id) REFERENCES emails(id)
    )`
  );
});

function addEmail(id, recipient, subject, sentTime) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO emails VALUES (?, ?, ?, ?)",
      [id, recipient, subject, sentTime],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function addOpen(id, ip, ua, time) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO opens VALUES (?, ?, ?, ?)",
      [id, ip, ua, time],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function getAllOpens() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM opens", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getReport() {
  const sql = `
    SELECT emails.id, emails.recipient, emails.subject, emails.sentTime,
           opens.ip, opens.ua, opens.time as openTime
    FROM emails
    LEFT JOIN opens ON emails.id = opens.id
    ORDER BY emails.sentTime DESC
  `;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function clearAll() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("DELETE FROM emails", (err1) => {
        if (err1) reject(err1);
        db.run("DELETE FROM opens", (err2) => {
          if (err2) reject(err2);
          else resolve();
        });
      });
    });
  });
}

module.exports = {
  addEmail,
  addOpen,
  getAllOpens,
  getReport,
  clearAll,
};
