
import { CustomError } from "../helpers/error.helper.js";
import Cart from "../models/cart.model.js"
import MenuItem from "../models/menu-model.js"
import Order from "../models/order-model.js";



export const addItemToCart = async(req,res,next)=>{

    try {
        const {menuItemId,user,quantity} = req.body;

        ////chk id cart exist for the user...if not create one

        let cart = await Cart.findOne({user})
        
        if(!cart){ 
            cart = new Cart({
                user,
                items:[],
                totalAmount: 0
            })
         }


        ////check if menuitem exist 
         const menuItem = await MenuItem.findOne({"_id":menuItemId});

         if(!menuItem){throw new CustomError("Menu item not found",404)}

         /////chk if item already exist in cart and treat accordingly

        const existingCartItem =  cart.items.find(item => item.menuItem.toString()=== menuItemId)


        if(existingCartItem){ 
          //add the quantity of new item to existing one
            existingCartItem.quantity += quantity



        }else{
            //NEW INSTANCE OF ITEM SO PUSH IT TO THE CART
            cart.items.push({
                
                menuItem:menuItemId,
                quantity
            })

        }

        //////Total amount update
        cart.totalAmount += menuItem.price * quantity

        ///save cart updates
        await cart.save();

        return res.status(200).json({
           
            success: true,
            data: cart

        })


    } catch (error) {
        

        next(error)
    }

}





export const getCartContent = async(req,res,next)=>{

    try {
        
        const {user}= req.params

        const cart = await Cart.findOne({user}).populate("items.menuItem")

        if(!cart){ throw new CustomError("cart not found",404)}


        return res.status(201).json({
            success:true,
            data:cart
        })

    } catch (error) {
        

        next(error)
    }

    
}



// ==================WORKON....Done
    

export const updateCartItemQuantity = async(req,res,next)=>{
   
    try {
        const {user}= req.params
        const {quantity,menuItemId}= req.body
        console.log("dddddd")
        //find cart associated with user
        const cart = await Cart.findOne(
           { user}
            ).populate({
                path: 'items.menuItem',
                model: 'Menu', 
            });
            
            console.log(cart)

        if(!cart){throw new CustomError("cart not found",404)}
            //menu itemindex associated to cart
        const menuItemIndex = cart.items.findIndex(item => item.menuItem._id.toString()=== menuItemId);
       
        //if it doesnt exist
        if (menuItemIndex === -1) {
            throw new CustomError("Menu item not found in cart", 404);
        }
        ////update its quantity
        
        cart.items[menuItemIndex].quantity = quantity

        ///////updating d total count

        cart.totalAmount = cart.items.reduce((total, item)=>  {
            const subtotal = item.quantity * item.menuItem.price;
            console.log(`Quantity: ${item.quantity}, Price: ${item.menuItem.price}, Subtotal: ${subtotal}`);
            return total + subtotal;},0)


        await cart.save()

        return res.status(200).json({

            success:true,
            data: cart

        })


    } catch (error) {
        
        next(error)

    }
    
}



export const clearCart = async(req,res,next)=>{


    try {

        const {user} = req.params;

        ////find cart
        const cart = await Cart.findOne({user})

        if(!cart){throw CustomError("cart not found",404)}

        cart.items = [],
        cart.totalAmount = 0

        await cart.save()


        return res.status(200).json({
            success: true,
            message:"Cart cleared successfully"
        })

        
    } catch (error) {
        

        next(error)
    }


    
    
}




export const deleteCartItem = async(req,res,next)=>{

    const {cartItemId} = req.body

    try {
        
        // find d cart that has the menu id
        const cart = await Cart.find({'items._id':cartItemId})
        
        if(!cart){throw new CustomError("cart doesn't exist", 404)}

        ///find cart item within found cart

        const cartItem = await cart.items.find(item => item._id.toString()=== cartItemId) 

        if(!cartItem){ throw new CustomError("cartitem not found",404)}

        //find menuitem associated with d cartitem

        const menuItemOfCart = await MenuItem.findById(cartItem.menuItem)

        if(!menuItemOfCart){throw new CustomError("cart item not found",404)}


        // update cart total amount

        cart.totalAmount -= cartItem.quantity * menuItemOfCart.price

        ////delete cart item
        cart.items.pull({_id:cartItemId})

        //save cart
        cart.save()


        return res.status(200).json({
            success: true,
            data:cart
          });

    } catch (error) {
        
        next(error)
    }

    
}