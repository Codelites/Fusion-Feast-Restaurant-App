import express from "express";
import { dbConnect } from "./database/db.js";

import fs from "fs/promises";
import path from "path";



import config from "./config/main.config.js";
import Errorhandler from "./middleware/error-handlingmiddleware.js";
import router from "./routes/routes.js"
// import url from 'url';
// import { Join } from "path";

// const __dirname =url.fileURLToPath(new url.URL('.', import.meta.url));
// app.set("views", join(__dirname, "views"));

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())

app.use("/api/v1/",router)

app.get( '/', async ( req, res, next ) =>
{
    const moduleDir = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(moduleDir, "welcome-message.html");

    try {
        // Read the content of the HTML file
        const htmlContent = await fs.readFile(filePath, "utf8");

        // Send the HTML content as the response
        res.send(htmlContent);
    } catch (err) {
        console.error("Error reading HTML file:", err);
        res.status(500).send("Internal Server Error");
    }
});

   
config.connectToDatabase();

app.use(Errorhandler)

app.listen(config.server.port,()=>{console.log(`app up and running on  PORT:${config.server.port}`)})