const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username :String,
    email:String,
    password:String,
    city:String,
    age:Number,
    gender:String
  },{
    versionKey:false
})

const UserModel = mongoose.model("users",userSchema);

module.exports={
    UserModel
}