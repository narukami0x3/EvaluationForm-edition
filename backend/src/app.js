const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config()

const port = process.env.PORT

app.use((req,res,next)=>{
    res.on('finish',()=>{
        console.log(req.method + ' ' + res.statusCode + ' ' + req.originalUrl)
    })
    next()
})

app.use('/file',express.static(path.join(__dirname,"upload")))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/auth',require('./routes/authroutes'))

app.use('/api/admin',require('./routes/adminroutes'))

app.use('/api/user',require('./routes/userroutes'))

app.use('/api/board',require('./routes/boardroutes'))

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})