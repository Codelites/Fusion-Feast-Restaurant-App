import express from "express";
import { dbConnect } from "./database/db.js";


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

app.get( '/', ( req, res, next ) =>
{
    return res.status(200).json({
      success: true,
      message:
        "Welcome to Fusion Feast Restaurant API. You can check out the docs at https://documenter.getpostman.com/view/27961423/2s9Y5WxPBv for information on how to use the API",
    });
})
config.connectToDatabase();

app.use(Errorhandler)

app.listen(config.server.port,()=>{console.log(`app up and running on  PORT:${config.server.port}`)})