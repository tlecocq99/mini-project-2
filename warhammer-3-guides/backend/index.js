const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const dataPath = path.join(__dirname, "data", "factions.json");

// Route: GET /api/factions
app.get("/api/factions", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading factions.json:", err);
      return res.status(500).json({ error: "Could not read factions data." });
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/factions/:slug", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read factions data." });
    }
    const factions = JSON.parse(data);
    const faction = factions.find((f) => f.slug === req.params.slug);
    if (!faction) return res.status(404).json({ error: "Faction not found" });
    res.json(faction);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
