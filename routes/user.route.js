const express = require("express");
const{UserModel} = require("../models/user.model");
const{BlackListModel} = require("../models/blacklist.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

// User Registration
userRouter.post("/register",async(req,res)=>{
    const{username,email,password,city,age,gender}= req.body;
    try{
        const user = await UserModel.findOne({email});
        console.log(user);
        if(user){
            res.status(400).send({msg:"User is already exits"});
        }
        bcrypt.hast(password,6,async(err,hash)=>{
            const user = new UserModel({username,email,password:hash,city,age,gender})
            await user.save();
            console.log(user);
            res.status(200).send({msg:"user registered successfully.."})
        })
    }catch(err){
        res.status(400).send({msg:"Internal server error"})
    }
})


// User Login 
userRouter.post("/login" , async(req,res)=>{
    const{email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        bcrypt.compare(password,user.password,(err,result));
        if(result){
            const access_token= jwt.sign({userID:user._id ,user:username},"aishu",{expiresIn:"7d"});
            res.status(200).send({msg:"user login successfully..",user,access_token});
        }else{
            res.status(400).send({msg:"Wrong credentials"})
        }
      }catch(err){
      res.status(400).send({msg:"Internal server error"})
    }
})


// User Logout
userRouter.get("/logout",async(req,res)=>{
    const access_token = req.headers.authorization?.split(" ")[1];
    try{
       const blacktoken = new BlackListModel({access_token:access_token});
       await blacktoken.save();
       res.status(200).send({msg:"user logout successfully.."});

    }catch(err){
        res.status(400).send({msg:"Internal server error"})
    }
})

module.exports={
    userRouter
}