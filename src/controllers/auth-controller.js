import { CustomError } from "../helpers/error.helper.js";
import User from "../models/user-model.js";
import argon from "argon2"
import { jwtsign } from "../services/jwt.services.js";

export const register = async(req,res,next)=>{

    const {email,username,password} = req.body
try{
    const emailexist = await User.findOne({email});

     if(emailexist){

        throw new CustomError("user already exists",409)
        // next(error)
        
     }  
     
     const hashedpass = await argon.hash(password)

    const user = await User.create({email,username,password:hashedpass});

    await user.save()
  return  res.status(200).json({
        success: true,
        data: user
    })



}catch(err){
    // console.error(err);
    // res.status(500).json({ error: 'Server error' });
    next(err)
  }
//mail logic
}




export const login = async (req,res,next)=>{
  console.log("gsgssfsfsfsf")

    const {email,password}= req.body;

    try{

      // check if email exist
      const user = await User.findOne({email})

      if(!user){throw new CustomError("incorrect email or password",404)}


      // verify pass word
      const verifiedpasssword = await argon.verify(user.password,password)
      if (!verifiedpasssword){
          throw new CustomError("incorrect email or password",404)
      }
      // assign token 
      const token = jwtsign( user )
      return res.status(200).json({user})

    }catch(err){
      next(err)
    }


}