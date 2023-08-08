import dotenv from "dotenv";

dotenv.config({ path: ".env.example" });


const config = {

    server:{
        port: process.env.PORT,
        mode: process.env.NODE_ENV
    },
    database:{
        dburl:process.env.MONGODB_URI
    },
    services:{
        jwt_secret : process.env.JWT_SECRET
    }





}


export default config