import express from 'express';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRouter from './routers/authRoute.js';
import categoryRouter from './routers/categoryRoute.js';
import productRouter from './routers/productRoute.js';
import otherRouter from './routers/otherRoute.js';

import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('eCommerce server v2');
});

// routers
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/other', otherRouter);

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
