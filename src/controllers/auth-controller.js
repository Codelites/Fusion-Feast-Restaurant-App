import { CustomError } from "../helpers/error.helper.js";
import User from "../models/user-model.js";
import argon from "argon2"
import { jwtsign } from "../services/jwt.services.js";
import PasswordReset from "../models/passreset.js";
import { sendWelcomeEmail } from "../services/mailservice.js";


import {generateToken} from "../helpers/tokenGenerator.js"



export const register = async(req,res,next)=>{
  console.log( "register" );
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


    // =============
     sendWelcomeEmail({
      username,
      email
    })


  return  res.status(200).json({
        success: true,
        data: user
    })
    //mail logic




}catch(err){
    // console.error(err);
    // res.status(500).json({ error: 'Server error' });
    next(err)
  }
}




export const login = async (req,res,next)=>{
  // console.log("gsgssfsfsfsf")
  console.log("login")

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
      const token = jwtsign({ userId: user.id, role: user.role });


      return res.status(200).json({
          userRole: user.role,
          token,
          user: {
            id: user.id,
            
        },
    })

    }catch(err){
      next(err)
    }


}


export const requestPasswordReset = async(req,res,next)=>{
  console.log("gdgdgdgdfdfd")
  //check for user via email
    const {email}= req.body;
    try{
      const user =  await User.findOne({email});
      
      if(!user){throw new CustomError("invalid email",401)}
      
      //generate token  and send email=============================
      
      const token =  generateToken();

      console.log(token)
      
      const hashedToken = await argon.hash(token)
      
      console.log("werwerrwerw")
    ///save to the record

    const resetRecord = await PasswordReset.create({
      user: user,
      resetToken: hashedToken
    })

    ////send token via email==================================
    
    await resetRecord.save()


    return res.status(201).json({
      success:true,
      data:resetRecord
    })

}catch(err){
next(err)

}






}




export const passwordReset = async(req,res,next)=>{

  //get new password
  const {token} = req.params
  const {newpassword}=req.body

  
  ////find user with token
  
  
  try{
    // const tokenhash = await argon.hash(token)
    
    const passwordReset = await PasswordReset.findOne({
      
      resetToken:token,
      expiresIn: { $gt: Date.now() },

    }).populate('user')

    console.log(passwordReset)

    if(!passwordReset){throw new CustomError("invalid or expired token",401)}


    if (!passwordReset.user || !passwordReset.user._id) {
      throw new CustomError("User information not available", 401);
    }
    ////has password
    console.log(newpassword)
    const hash = await argon.hash(newpassword)

    
      console.log(passwordReset.user._id)

    const  updateduserinfo = await User.findByIdAndUpdate(
     passwordReset.user._id,
      {password : hash},
      { new: true }
    )
      

    return res.status(201).json({
      message:"password reset successful",
      data:updateduserinfo
    })
///=====================================email
  }catch(err){
    next(err)
  }




  
}