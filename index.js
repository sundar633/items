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
  try {
    const text = fs.readFileSync("./items.json","utf8");
    const data = JSON.parse(text);
    res.json(data);
  } catch(err) {
    console.error(err);
    res.status(500).json({error:"cannot read items.json"});
  }
});

app.listen(PORT, ()=> {
  console.log("server running on " + PORT);
});
