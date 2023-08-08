import exp from "constants";
import express from "express";
import { register,login } from "../controllers/auth-controller.js";



const router = express.Router();



// auth Routes
router.post("/auth/register",register)
router.post('/auth/login',()=>{console.log("GGGGGG")},login)
// router.post('/auth/forgot-password')
// router.post('/auth/reset-password')

// // Menu routes 
// router.get('/menu/getmenus',getMenus)
// router.get('/menu/:id',getMenu)
// router.post('/menu',)
// router.put('/menu/:id')
// router.delete('/menu/:id',)

// // cart routes
// router.get('/cart',getCarts)
// router.get('/cart/:id',getCart)
// router.post('/cart')
// router.put('/cart/:id')
// router.delete('/cart/:id')





export default router