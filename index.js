import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Handle __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// Load items.json
const itemsPath = path.join(__dirname, "items.json");
let itemsData = [];

try {
  const data = fs.readFileSync(itemsPath, "utf8");
  itemsData = JSON.parse(data);
} catch (err) {
  console.error("Error reading items.json:", err);
}

// Root route
app.get("/", (req, res) => {
  res.send("🍫 Chocolate Store API is running!");
});

// API route
app.get("/api/items", (req, res) => {
  res.json(itemsData);
});

// Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
