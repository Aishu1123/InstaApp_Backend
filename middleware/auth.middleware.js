const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const access_token = req.headers.authorization?.split(" ")[1];
    if(access_token){
        const decoded= jwt.verify(access_token,"aishu");
        if(decoded){
            req.body.userID=decoded.userID;
            req.body.user=decoded.user;
            next();
        }
    }else{
        res.status(400).send({msg:"You are not authorised"});
    }
};

module.exports={
    auth
}