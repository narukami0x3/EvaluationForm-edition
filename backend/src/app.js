const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use((req,res,next)=>{
    res.on('finish', () => {
        console.log(`${req.method} ${res.statusCode} ${req.originalUrl}`)
        // console.log(req.headers)
        // console.log(req.body)
    })
    next()
})

app.use('/api/auth',require('./routes/authroutes'))
app.use('/api/admin',require('./routes/adminroutes'))

app.use((req,res)=>{
    res.status(404).json({error: "Page Not Found"})
})


app.listen(port,()=>{
    console.log(`SERVER STARTED AT PORT : ${port}`)
})