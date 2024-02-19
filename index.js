const express = require("express");
const cors = require("cors")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {pictureRouter} = require("./routes/picture.route")
require("dotenv").config();


const app=express();

app.use(express.json());
app.use(cors());

app.use("/users" , userRouter);
app.use("/picture" , pictureRouter)


app.listen(process.env.port,async()=>{
try{
     await connection;
    console.log(`Server is running at ${process.env.port}`);
    console.log(`InstaDatabase is connected`);

}catch(err){
    console.log(err);
}
})