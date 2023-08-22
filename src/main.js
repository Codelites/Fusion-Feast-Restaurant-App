import express from "express";
import { dbConnect } from "./database/db.js";
import router from "./routes/routes.js";

import config from "./config/main.config.js";
import Errorhandler from "./middleware/error-handlingmiddleware.js";
// import url from 'url';
// import { Join } from "path";

// const __dirname =url.fileURLToPath(new url.URL('.', import.meta.url));
// app.set("views", join(__dirname, "views"));

const app = express();

app.set('view engine', 'ejs');
app.use(express.json())

app.use('/api/v1',router);

dbConnect(config)

app.use(Errorhandler)

app.listen(config.server.port,()=>{console.log(`app up and running on  PORT:${config.server.port}`)})