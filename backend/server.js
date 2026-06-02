import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { createServer } from 'http'
import { Server } from 'socket.io'

// Fix BigInt serialization
BigInt.prototype.toJSON = function () { return this.toString() }
// import connectDB from './config/mongodb.js' // Using Prisma instead
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import adminRouter from './routes/adminRoute.js'
import wishlistRouter from './routes/wishlistRoute.js'
import newsletterRouter from './routes/newsletterRoute.js'
import couponRouter from './routes/couponRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: [
            process.env.FRONTEND_URL || 'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:5176',
            'http://localhost:3000',
            'https://shoplex-frontend.onrender.com'
        ],
        methods: ["GET", "POST"]
    }
})

// Real-time tracking storage
const productViewers = {}
const socketToProduct = {}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('joinProduct', (productId) => {
        socket.join(productId)
        socketToProduct[socket.id] = productId
        productViewers[productId] = (productViewers[productId] || 0) + 1
        io.to(productId).emit('viewerUpdate', { productId, count: productViewers[productId] })
    })

    socket.on('leaveProduct', (productId) => {
        socket.leave(productId)
        delete socketToProduct[socket.id]
        if (productViewers[productId]) {
            productViewers[productId]--
            io.to(productId).emit('viewerUpdate', { productId, count: productViewers[productId] })
        }
    })

    socket.on('disconnect', () => {
        const productId = socketToProduct[socket.id]
        if (productId && productViewers[productId]) {
            productViewers[productId]--
            io.to(productId).emit('viewerUpdate', { productId, count: productViewers[productId] })
            delete socketToProduct[socket.id]
        }
        console.log('User disconnected:', socket.id)
    })
})


// connectDB() // Using Prisma instead
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://localhost:3000',
        'https://shoplex-frontend.onrender.com'
    ],
    credentials: true
}))

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/coupon', couponRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

httpServer.listen(port, () => {
    console.log(`Shoplex Server running on http://localhost:${port}`)

})