// ✅ Imports
import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Express app setup
const app = express();

// ✅ Enable CORS for both local dev and Netlify
app.use(cors({
  origin: ["http://localhost:5173", "https://your-netlify-site.netlify.app"], // 👈 add your Netlify URL later
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Handle __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static images (optional)
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ Load items.json safely
const itemsPath = path.join(__dirname, "items.json");
let itemsData = [];

try {
  const data = fs.readFileSync(itemsPath, "utf8");
  itemsData = JSON.parse(data);
  console.log("📦 Loaded items.json successfully.");
} catch (err) {
  console.error("❌ Error reading items.json:", err);
}

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🍫 Chocolate Store API is running!");
});

// ✅ API route
app.get("/api/items", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 👈 extra CORS safety
  res.json(itemsData);
});

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
