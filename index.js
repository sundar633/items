import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("API working");
});

app.get("/api/all",(req,res)=>{
  const data = JSON.parse(fs.readFileSync("./items.json","utf8"));
  res.json(data);
});

app.listen(PORT, ()=> {
  console.log("server running on " + PORT);
});
