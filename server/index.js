import express from 'express'
import { connectDB } from './config/db.js'
import { apiRouter } from './routes/index.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app = express()
const port = 3000


connectDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use(cookieParser())
app.use("/api",apiRouter)

app.all("*",(req,res,next)=>{
  res.status(404).json({message:"endpoint doesn't exist"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})