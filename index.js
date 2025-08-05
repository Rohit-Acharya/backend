import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import mailmessage from './src/routes/messages.js';
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
mongoose.set("strictQuery", false);


app.use(cors());

app.use(cookieParser());
app.use(express.json());



// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit if DB connection fails
  }
};

// Connect to MongoDB when the app starts
connectDB();

// Middleware


// Routes
app.use('/api/messages', mailmessage);


app.get('/', (req, res) => {
  res.send('Hello, World!');
})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
