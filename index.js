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
  try {
    const data = JSON.parse(fs.readFileSync("./items.json", "utf8"))
    res.json(data)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})


app.listen(PORT, () => console.log("server on " + PORT))
