import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req,res)=>{
  res.send("API working");
});

app.get("/api/chocolates",(req,res)=>{
  const data = JSON.parse(fs.readFileSync("./data/chocolates.json","utf8"));
  res.json(data);
});

app.listen(PORT, ()=> {
  console.log("server running on " + PORT);
});
