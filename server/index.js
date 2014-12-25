import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/dbconnect.js'
import productRouter from './routers/products.routes.js'
import userRouter from './routers/users.routes.js'
import cartRouter from './routers/cart.routes.js'
import orderRouter from './routers/order.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

const URI = process.env.URI || "mongodb://127.0.0.1:27017"
const PORT = process.env.PORT || 8000

// Database Connection 
connectDB(URI)

// Middlewares 
app.use(cors())
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", orderRouter)

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`)
})
