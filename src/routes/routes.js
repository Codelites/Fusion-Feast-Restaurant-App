import exp from "constants";
import { Router} from "express";

import { register,login, requestPasswordReset, passwordReset } from "../controllers/auth-controller.js";
import { createMenuItem, deleteMenuItem, getMenuItem, getMenusItems, updateMenuItem } from "../controllers/menu-controller.js";
import { addItemToCart, getCartContent, updateCartItemQuantity, clearCart,deleteCartItem } from "../controllers/cart-controller.js";

import { getOrderDetails,getUserOrderHistory,checkoutAndPlaceOrder } from "../controllers/order-controller.js";
// import initializePayment from "../controllers/paystack.js"

import { AuthCheck } from "../middleware/auth-middleware.js";
import { checkUserRoles } from "../middleware/user-roles-middleware.js";
import { initializeTransaction } from "../controllers/transaction.controller.js";


const router = Router();



// auth Routes
router.post("/auth/register",register)
router.post('/auth/login',login)
router.post('/auth/forgot-password',requestPasswordReset)
router.post('/auth/reset-password/:token',passwordReset)

// // Menu routes 
router.get('/menu/getmenus/',AuthCheck,getMenusItems)
router.get('/menu/getmenu/:id',AuthCheck,getMenuItem)
router.post('/menu',AuthCheck,checkUserRoles('admin'),createMenuItem)
router.put('/menu/:id',AuthCheck,checkUserRoles('admin'),updateMenuItem)
router.delete('/menu/:id',AuthCheck,checkUserRoles('admin'),deleteMenuItem)

// // cart routes
router.post('/cart',AuthCheck,addItemToCart)
router.get('/cart/getcartcontent/:user',AuthCheck,getCartContent)
router.get('/cart/clearcart/:user',AuthCheck,clearCart)
router.put('/cart/:user',AuthCheck,updateCartItemQuantity)
router.delete('/cart/:cartItemId',AuthCheck,deleteCartItem)


///order routes
router.get('/order/place-order',AuthCheck, checkoutAndPlaceOrder)
router.get('/order/order-history/:user',AuthCheck, getUserOrderHistory)
router.get('/order/order-details/:orderId',AuthCheck, getOrderDetails)
router.post("/order/intialize-payment/:orderId", AuthCheck, initializeTransaction);

// router.post('/acceptpayment', initializePayment.acceptPayment);


export default router
