import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

//app config
const app=express();
const port = process.env.PORT || 10000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors({
  origin: 'https://spotify-mern-nine.vercel.app',
  credentials: true
}));


//Initialising routes
app.use("/api/song",songRouter)
app.use("/api/album",albumRouter)

app.get('/', (req, res) => res.send('API Working'));

app.listen(port,()=>console.log(`Server started on ${port}`))