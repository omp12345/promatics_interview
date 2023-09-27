const  mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String
},{
    versionKey:false
})
const usermodel=mongoose.model("users",userSchema)
module.exports={
    usermodel
}