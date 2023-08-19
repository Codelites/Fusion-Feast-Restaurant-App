
import { Schema,model } from "mongoose";

const menuSchema = new Schema({

    name:{
        type: String,
        required: true
    },

    description:{
        type:String,
        required:true
    },
    pictureUrl:{
        type:String,
        // required: true
    },

    price:{
        type: Number,
        required:true
    },
    
    category:{
        type: String,
        enum:["burger","slides","drinks"],
        required:true

    },
    ordersCount:{
        type:Number,
        default: 0
    }
})

const MenuItem = model("Menu",menuSchema);

export default MenuItem