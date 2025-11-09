import express from "express"
import cors from "cors"
import fs from "fs"

const app = express()
app.use(cors())

const PORT = process.env.PORT || 10000

app.get("/", (req, res) => {
  res.send("API online ✅")
})

app.get("/items", (req, res) => {
  const json = fs.readFileSync("./items.json", "utf8")
  res.send(json)
})

app.listen(PORT, () => console.log("server on " + PORT))
