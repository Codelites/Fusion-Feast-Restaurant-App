import dotenv from "dotenv";
// import path from "path"

dotenv.config({ path: ".env.example" });

// import { config as Configuration } from "dotenv";
// Configuration({ path: ".env.example" });
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
    },
    mailServices:{
        
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT, 
        
        auth:{
           user: process.env.EMAIL_USER,
           pass: process.env.EMAIL_PASS
        }
    },
    // rootPath: path.resolve(__dirname)





}


export default config