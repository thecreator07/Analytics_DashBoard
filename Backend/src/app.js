import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"
const app = express();


app.use(
  cors({
    origin: "*", //urls to give access
    credentials: true,
  })
);

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log(__dirname)
// console.log(dummy)
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../dist")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"))
})


import dataRouter from "./routes/data.routes.js"

app.use("/api/v1", dataRouter)

export { app };
