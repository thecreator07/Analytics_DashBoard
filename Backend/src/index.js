import dotenv from "dotenv";
import "dotenv/config";
import { app } from "./app.js";
import connectDb from "./DB/index.js";


dotenv.config({
    path: ".env",
});

const port = process.env.PORT || 8000;
connectDb()
    .then(() => {
        app.on("Error", (err) => {
            console.log(err);
        });

        app.listen(port, () => {
            console.log(`Server running on port: http://localhost:${port}`);
        });
       
    }).catch((err) => {
        console.log("MongoDb connection failed !!", err);
    });

