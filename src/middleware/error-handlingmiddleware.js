import { error } from "console";
import { CustomError } from "../helpers/error.helper.js";
import config from "../config/main.config.js";


const Errorhandler = function (err,req,res,next){


    if ( err instanceof  CustomError){

         return res.status(err.statuscode).json({
            success: false,
            message: err.message,
            error_code:err.statuscode,
            stack: config.server.mode === 'development' ? err.stack : {}
        })

    }
    
    
    return res.status(500).json({
         success: false,
         message: err.message,
         // stack: config.server.mode === "development" ? err.stack : {}
     });
}

export default Errorhandler