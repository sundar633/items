import express from "express"
import cors from "cors"
import fs from "fs"

const app = express()
app.use(cors())

// serve images folder (important if you use images/118.jpg)
app.use("/images", express.static("images"))

const PORT = process.env.PORT || 10000

app.get("/", (req, res) => {
  res.send("API online ✅")
})

app.get("/items", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./items.json", "utf8"))
  res.json(data) // THIS sends real JSON
})

app.listen(PORT, () => console.log("server on " + PORT))
