
import {model,Schema,ObjectId} from "mongoose"

 const passwordResetSchema = new Schema({

    user:{
        type:ObjectId,
        ref:"User"
    },

    resetToken:{
        type: String,
        required: true

    },
    expiresIn:{
        type:Date,
        default: new Date( Date.now() + 30 * 60 * 1000)
    }

},{timestamps:true})


const PasswordReset = model("PasswordReset",passwordResetSchema);

export default PasswordReset;