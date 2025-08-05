import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mailmessage from './src/routes/messages.js';

const app = express();
mongoose.set("strictQuery", false);

// ✅ CORS FIRST
app.use(cors({
  origin: "https://portfolio-seven-inky-37.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Handle preflight requests globally
app.options('*', cors());

// ✅ Body parsing
app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
connectDB();

// ✅ Routes
app.use('/api/messages', mailmessage);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
