import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail.js";
import crypto from "crypto"

export const forgetPassword  = async (req, res)=>{
  //take the email
  const {email} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(400).json({message:"no user not found with this email"});
  }
 
  const resetToken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
  const message = `click on the link to reset you password. ${url}. if you have not requested then please ingnore.`

  await sendEmail(user.email, "Password Reset Request", message);

  
  return res.status(200).json({message:"check you mail for reset password", resetToken});
}

export const passwordReset = async (req, res)=>{
  try {
    const {resetToken} = req.params;
    const {password:newPassword} = req.body
  
  
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{
        $gt: Date.now(),
      }
  
    });
  
  
    if(!user){
      return res.status(400).json({message:"token is expired or invalid"});
  
    }
    user.password = newPassword;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
  
    await user.save();
  
    return res.status(200).json({message:"password reset successfully"});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({message:"Internal server error", err:error?.message})
    
  }


}

export const register = async(req, res)=>{
    
   try {
     const { name, email, password } = req.body;
 
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: "User already exists" });
     }
 
     //hasing is done on model level
 
     const user = await User.create({
         name,
         email,
         password
     });
 
     return res.status(201).json({
         message:"User registered  successfully",
         id:user._id,
         name:user.name,
         email:user.email
     })
   } catch (err) {
        return res.status(500).json({ message: "Server error", error: err?.message });

   }

}

export const login = async (req, res)=>{

try {
        const { email, password:enteredPassword } = req.body;

        
    
        const user = await User.findOne({email}).select("+password");

        if(!user){
          return res.status(401).json({message:"Invalide credentials"});
        }

        const isMatched = await user.verifyPassword(enteredPassword); //have to user obj.

        if(!isMatched){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
    
        //generating a jwt
        const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );

        res.cookie("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production", //in prod only
            sameSite:"None", //csrf
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
    
        return res.status(200).json({
          message: "Login successful",
          userId:user._id,
          token
        })
} catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to login",
      error: err?.message,
    });
}


}

export const myProfile = async (req, res)=>{
  try {
    const {id} = req.user;

    const user = req.user;

  return res.status(200).json({message:"successfully fetched", user});
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to fetch profile",
      error: err?.message,
    });
    }

}

export const logout = async (req, res) => {
  try {
    return res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:"None",
      maxAge: 0,
      path: '/'  
    }).status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
