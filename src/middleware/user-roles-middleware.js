import { CustomError } from "../helpers/error.helper.js"



export const checkUserRoles = (requiredRole)=> (req,res,next)=>{

    const userRole = req.userRole
    console.log(userRole)
    console.log("444444")
    if( userRole === requiredRole){
        console.log("tftftftf")
        next()
    }else{

       throw new CustomError("You do not have permisssion to access this resource", 403)
    }





}