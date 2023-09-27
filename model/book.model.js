const  mongoose=require("mongoose")
const BOOKSChema=mongoose.Schema({
    title:String,
    Author:String,
    ISBN:Number,
    Description:String,
    Price:Number
},{
    versionKey:false
})
const BOOKData_MODEL=mongoose.model("BOOK_DATA_COLLCECTION",BOOKSChema)
module.exports={
    BOOKData_MODEL
}