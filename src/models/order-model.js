// import { ObjectId } from "mongodb"
import {ObjectId,Schema,model,} from "mongoose"




const orderSchema = new Schema({


    user:{
        type:ObjectId,
        ref:"User"
    },

    items:[{

        menuItem:{
            type:ObjectId,
            ref:"Menu",
            required:true

        },
        quantity:{
            type:Number,
            required:true
        },

        
        
        
                
            }
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        orderDate: {
            type: Date,
            default: Date.now,
        },


})




const Order =  model("Order",orderSchema)


export default Order