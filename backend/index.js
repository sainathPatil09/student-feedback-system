import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import adminRoute from './routes/admin.route.js'
import coordinatorRoute from './routes/coordinator.route.js'
import facultyRoute from './routes/faculty.route.js'
import studentRoute from './routes/student.route.js'
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT
const mongoURI = process.env.MONGO_URI
try {
    mongoose.connect(mongoURI)
    console.log("connected to MONGODB")
} catch (error) {
 console.log(error);
}

app.use("/home", (req, res)=>{
    console.log("Home")
    res.send("Home")
})
app.use('/api', adminRoute)
app.use('/api', coordinatorRoute)
app.use('/api', facultyRoute)
app.use('/api', studentRoute)

app.listen(port, ()=>{
    console.log(`App listning on port ${port}`)
})