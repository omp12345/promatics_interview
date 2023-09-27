const express=require("express")
const { connection } = require("./db")
const { Book_Router } = require("./Router/book.routes")
const { user_Router } = require("./Router/user.routes")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use("/users",user_Router)
app.use("/bookdata",Book_Router)


app.listen(process.env.PORT,async()=>{
    await connection
    console.log("monngodb is connected")
    console.log(`${process.env.PORT} is running at server`)
})

