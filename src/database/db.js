import mongoose from "mongoose";
import config from "../config/main.config.js";



 export const  dbConnect = (config)=>{
mongoose.connect(config.database.dburl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{

    console.log("db connected successfully")
}).catch((err)=>{
    console.error('Error connecting to the database:', err.message);
})
}