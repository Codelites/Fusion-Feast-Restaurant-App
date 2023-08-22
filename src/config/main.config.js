import dotenv from "dotenv";
// import path from "path"

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