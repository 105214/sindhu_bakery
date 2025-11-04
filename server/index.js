import express from 'express'
import { connectDB } from './config/db.js'
import { apiRouter } from './routes/index.js'
import cookieParser from 'cookie-parser'
const app = express()
const port = 3000


connectDB()
app.use(express.json())
app.use(cookieParser())
app.use("/api",apiRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res)=>{
  res.status(404).json({message:"endpoint doesn't exist"})
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})