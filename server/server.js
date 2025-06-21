import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoute.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";


connectDB()
connectCloudinary();

const app = express()
app.use(cors()) //enable cross-origin resource sharing

//middleware
app.use(express.json())
app.use(clerkMiddleware())

//API to listen to Clerk Webhooks
app.post("/api/clerk", bodyParser.raw({ type: "application/json" }), clerkWebhooks);


app.get('/',(req,res)=>res.send("API is working"))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT|| 3000;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
