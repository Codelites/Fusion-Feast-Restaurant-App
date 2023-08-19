

import { ObjectId,model,Schema} from "mongoose";


const cartSchema = new Schema({

    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
        
        menuItem:    {
            type:ObjectId,
            ref:"Menu"
             },

        quantity:{
            type:Number,
            required:true

        }
        
    
    }
    ],
    totalAmount:{
        type: Number,
        required:true
    }


})

const Cart = model("Cart",cartSchema)

export default Cart