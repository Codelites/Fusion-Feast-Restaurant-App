
import express from "express";
import { register,login, requestPasswordReset } from "../controllers/auth-controller.js";
import { createMenuItem, deleteMenuItem, getMenuItem, getMenusItems, updateMenuItem } from "../controllers/menu-controller.js";
import { addItemToCart, getCartContent, updateCartItemQuantity, clearCart,deleteCartItem } from "../controllers/cart-controller.js";

import { getOrderDetails,getUserOrderHistory,checkoutAndPlaceOrder } from "../controllers/order-controller.js";


const router = express.Router();



// auth Routes
router.post("/auth/register",register)
router.post('/auth/login',login)
router.post('/auth/forgot-password', ()=>{console.log("ffdffddfd")},requestPasswordReset)
// router.post('/auth/reset-password')

// // Menu routes 
router.get('/menu/getmenus',getMenusItems)
router.get('/menu/:id',getMenuItem)
router.post('/menu',createMenuItem)
router.put('/menu/:id',updateMenuItem)
router.delete('/menu/:id',deleteMenuItem)

// // cart routes
router.post('/cart',addItemToCart)
router.get('/cart/getcartcontent/:user',getCartContent)
router.get('/cart/clearcart/:user',clearCart)
router.put('/cart/:user',updateCartItemQuantity)
router.delete('/cart/:cartItemId',deleteCartItem)


///order routes
router.get('/order/place-order/:user', checkoutAndPlaceOrder)
router.get('/order/order-history/:user', getUserOrderHistory)
router.get('/order/order-details/:orderId', getOrderDetails)




export default router