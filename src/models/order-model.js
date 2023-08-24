// import { ObjectId } from "mongodb"
import {ObjectId,Schema,model,} from "mongoose"




const orderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },

    items: [
      {
        menuItem: {
          type: ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);




const Order =  model("Order",orderSchema)


export default Order