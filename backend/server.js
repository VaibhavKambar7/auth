const express = require('express')
const app = express()
const router = require('./routes/userRoute')
const connectDB = require('./db/connect')
const authMiddleware = require('./middlewares/authMiddleware')

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send('hello there')
})

app.use('/api/user',router)

app.use(authMiddleware)


app.listen(5000,() => {console.log('server is running ..')});

