import express from "express";
import { dbConnect } from "./database/db.js";
import { appRouter } from "./routes/routes.js";

import config from "./config/main.config.js";
import Errorhandler from "./middleware/error-handlingmiddleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1", appRouter);

config.connectToDatabase();

app.use(Errorhandler)

app.listen(config.server.port,()=>{console.log(`app up and running on  PORT:${config.server.port}`)})