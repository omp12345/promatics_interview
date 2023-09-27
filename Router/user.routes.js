const express=require("express")
const user_Router=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { usermodel } = require("../model/user.model")
// THis is The user Route



// this is the Route for register the book
user_Router.post("/Register",async(req,res)=>{
   const  {name,email,password}=req.body
  

    try {
        bcrypt.hash(password,5,(err,hash)=>{
            if(err){
                res.json("password does not ahshed")
            }else{
                const adduser=new usermodel({name,email,password:hash})
                res.status(200).json({user:adduser,msg:"userSuccesfully register"})

            }
        })

    } catch (error) {
        res.status(400).json("not found")
    }
   

})
// this the route for login
user_Router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user= await usermodel.find({email})
    
  try {
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
              const token= jwt.sign({user:user.name,userid:user._id},process.env.SECRET_KEY)
              res.status(200).json({toke:token,msg:"user is Login succesfully"})
            }else{
                res.json("Not authorised")
            }
        })
    }

  } catch (error) {
    res.status(400).json(error)
  }

})

module.exports={
    user_Router
}