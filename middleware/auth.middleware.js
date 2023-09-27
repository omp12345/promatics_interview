const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{

   const token= req.headers.authorization?.split(" ")[1]
   try {
    if(token){
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(decoded){
            next()
        }else{
            res.staus(400).json("Please login")
        }
        
       }
   } catch (error) {
    res.status(400).json("Token is Wrong")

   }

}
module.exports={
    auth
}