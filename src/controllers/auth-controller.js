import { CustomError } from "../helpers/error.helper.js";
import User from "../models/user-model.js";
import argon from "argon2"
import { jwtsign } from "../services/jwt.services.js";
import PasswordReset from "../models/passreset.js";


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
  // console.log("gsgssfsfsfsf")

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


export const requestPasswordReset = async(req,res,next)=>{
  console.log("gdgdgdgdfdfd")
  //check for user via email
    const {email}= req.body;
try{
    const user =  await User.findOne({email});

    if(!user){throw new CustomError("invalid email",401)}

  //generate token  and send email=============================

    const token =  generateToken();

    const hashedToken = await argon.hash(token);

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

  
  ////find user with email

  try{

    const user = PasswordReset.findOne({
      
      resetToken:token,
      expiresIn: { $gt: Date.now() },

    })

    if(!user){throw new CustomError("invalid or expired token",401)}

    ////has password
    const hash = await argon2.hash(newpasswordpassword)

    const  updateduserinfo = await User.findByIdAndUpdate(
    { _id:user.userId ,
      password : newpassword},
      { new: true }
    )


    return res.status(201).json({
      message:"passwrod reset successful",
      data:user
    })
///=====================================email
  }catch(err){
    next(err)
  }




  
}