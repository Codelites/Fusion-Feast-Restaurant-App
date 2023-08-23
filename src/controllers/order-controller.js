import Order from "../models/order-model.js";
import Cart from "../models/cart.model.js";
import { CustomError } from "../helpers/error.helper.js";
import mongoose from "mongoose";





export const checkoutAndPlaceOrder = async (req,res,next)=>{

    try {
        const {user}= req.params

        ///find cart
        const cart  =  await Cart.findOne({user}).populate("items.menuItem");


        if(!cart){throw new CustomError("cart not found",404) }

        ///create order 
        const order = new Order({
        
            user:cart.user,
            items: cart.items,
            totalAmount: cart.totalAmount,
        
        })

        // Update the ordersCount for menu items in the cart to keep track of menu sales
        for (const cartItem of cart.items) {
   
            await MenuItem.updateOne(
       
                { _id: cartItem.menuItem._id },
        { $inc: { ordersCount: cartItem.quantity } }

            );
        }

        ///clear cart after checkout

        cart.items = [],
        cart.totalAmount = 0

        await cart.save()

        await order.save()


        return res.status(200).json({
            success:true,
            data:order
        })



    } catch (error) {
        
        next(error)

    }


}


// =========

export const getUserOrderHistory = async(req,res,next)=>{


        try {
            
            const {user}= req.params;

            ////chk for orders of tis uuser

            const  orders = await Order.findOne({user})


            return res.status(200).json({
                success : true,
                data: orders
            })


        } catch (error) {
            

            next(error)


        }


}

// =======lookinto

export const getOrderDetails =async (req,res,next)=>{

    try {

        const {orderId}= req.params


        //conevrt  orderid string to object
         const orderIdObj =  new mongoose.Types.ObjectId(orderId)
        ///find d order

        const order = await  Order.findOne({_id:orderIdObj})
        console.log(order)

        if (!order) {
            throw new CustomError("Order not found", 404);
        }


        return res.status(200).json({
            success: true,
            data: order,
        });



        
    } catch (error) {
        next(error)
    }


}