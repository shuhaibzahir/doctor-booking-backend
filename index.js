require('dotenv').config()
const express = require("express")
const app = express()
const {dbConnect} = require("./src/config/db")
// const doctorRoutes = require('./src/routers/doctor')
const hospitalAuth = require('./src/routers/Hospital/auth')


dbConnect(process.env.MONGO_URL)
app.use(express.urlencoded({extended:false}))

 
app.use('/api/hospital/auth/',hospitalAuth)

const {PORT=5050}=process.env

app.listen(PORT,()=>{
    console.log(`server started @ ${PORT}`)
})