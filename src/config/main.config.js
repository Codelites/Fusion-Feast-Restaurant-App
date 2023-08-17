import { config as Configuration } from "dotenv";
Configuration({ path: ".env.example" });
import mongoose from "mongoose";

const config = {

    server:{
        port: parseInt(process.env.PORT, 10),
        mode: process.env.NODE_ENV
    },
    connectToDatabase: function ()
    {
        mongoose
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => {
            console.log("db connected successfully");
          })
          .catch((err) => {
            console.error("Error connecting to the database:", err.message);
          });
    },
    services:{
        jwt_secret : process.env.JWT_SECRET
    }





}


export default config