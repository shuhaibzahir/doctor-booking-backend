require('dotenv').config()
const express = require("express")
const app = express()
const {dbConnect} = require("./src/config/db")
const doctorRoutes = require('./src/routers/doctor')
const hospitalRoutes = require('./src/routers/hospital')


dbConnect(process.env.MONGO_URL)
app.use(express.urlencoded({extended:false}))

app.use('/api/doctor',doctorRoutes)
app.use('/api/hospital',hospitalRoutes)

const {PORT=5050}=process.env

app.listen(PORT).then(()=>{
    console.log(`server started @ ${PORT}`)
})
