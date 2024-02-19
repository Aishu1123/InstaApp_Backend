const express = require("express");
const{PictureModel} = require("../models/picture.model");
const { auth } = require("../middleware/auth.middleware");

const pictureRouter = express.Router();

// Add Pictures
pictureRouter.post("/",auth,async(req,res)=>{
    try{
      const picture = new PictureModel(req.body);
      await picture(save); 
      res.status(200).send({msg:"new picture added"})
    }catch(err){
        console.log(err)
        res.status(400).send({msg:"Internal server error"})
    }
})

// Get Pictures
pictureRouter.get("/",auth,async(req,res)=>{
    try{
      const pictures = await PictureModel.find({userID:req.body.userID});
      res.status(200).send({pictures})
    }catch(err){
        res.status(400).send({msg:"Internal server error"})
    }
})

// Edit a picture
pictureRouter.patch("/:picID" , auth , async(req,res)=>{
    const{picID}=req.params;
    try{
      const picture = await PictureModel.findOne({_id:picID});
      if(picture.userID===req.body.userID){
        await PictureModel.findByIdAndUpdate({_id:picID},req.body);
        res.status(200).send({msg:`the picture with ID:${picID} has been updated`});
      }else{
        res.status(400).send({msg:"You are not authorised"});
      }
    }catch(err){
        res.status(400).send({msg:"Internal server error"});
    }
})

// // Delete a picture
pictureRouter.delete("/:picID" , auth , async(req,res)=>{
    const{picID}=req.params;
    try{
      const picture = await PictureModel.findOne({_id:picID});
      if(picture.userID===req.body.userID){
        await PictureModel.findByIdAndDelete({_id:picID});
        res.status(200).send({msg:`the picture with ID:${picID} has been deleted`});
      }else{
        res.status(400).send({msg:"You are not authorised"});
      }
    }catch(err){
        res.status(400).send({msg:"Internal server error"});
    }
})


module.exports={
    pictureRouter
}