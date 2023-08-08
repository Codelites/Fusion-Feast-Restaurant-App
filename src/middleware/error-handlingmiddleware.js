import { error } from "console";
import { CustomError } from "../helpers/error.helper.js";


const Errorhandler = function (err,req,res,next){


    if ( err instanceof  CustomError){

         res.status(err.statuscode).json({

            success: false,
            message: err.message,
            error_code:err.statuscode,
            // stack: config.server.mode === 'development' ? err.stack : {}

        })

        res.status(500).json({
            success: false,
            message: err.message,
            // stack: config.server.mode === "development" ? err.stack : {}
        });
    }


}

export default Errorhandler