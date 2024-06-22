import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "*", //urls to give access
    credentials: true,
  })
);
// console.log(dummy)
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "./public/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/dist/index.html"))
})


import dataRouter from "./routes/data.routes.js"

app.use("/api/v1", dataRouter)

export { app };
