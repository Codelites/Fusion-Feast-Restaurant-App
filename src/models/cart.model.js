
import { required } from "joi";
import { ObjectId,model,Schema} from "mongoose";


const cartSchema = new Schema({

    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    items:{
        type:ObjectId,
        ref:"Menu"
    },
    totalAmount:{
        type: Number,
        required:true
    }


})

const Cart = model("Cart",cartSchema)

export default Cart