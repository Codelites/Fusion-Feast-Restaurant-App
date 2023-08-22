import { CustomError } from "../helpers/error.helper.js"
import jwt  from "jsonwebtoken"
import config from "../config/main.config.js"


export const AuthCheck = (req,res,next)=>{
try{
        //get auth header
    const authheader = req.headers.authorization

    if (!authheader){throw new CustomError ("unAuthorized:user not logged-in",401)}

    ////extract token

    const token = authheader.split(" ")[1]

    //verify token
   const decoded =  jwt.verify(token,config.services.jwt_secret)
    
    req.user = decoded
    req.userRole = decoded.body.role;
    // console.log(decoded)

    console.log("User Role:", req.userRole);
    next()
}catch(err){

next(err)

}


}