// packages import
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';

//  middleware import
import {notFoundMiddleware, errorHandlerMiddleware} from './middlewares/index.js';

//  router import
import authRouter from './routes/authRoute.js';

// prisma import
import {PrismaClient} from '@prisma/client';

// --------------------------------------
//  env setup
dotenv.config();

// app setup
const app = express();
const port = process.env.PORT || 5000;
const base_url = '/api/v1';
const prisma = new PrismaClient();

// extra packages middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes setup
app.get('/', (req, res) => {
  res.json({msg: 'welcome mintube server'});
});
app.use(`${base_url}/auth`, authRouter);

// 🔥 error middleware 항상 마지막 미들웨어에 위치 🔥
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start server
const startServer = async () => {
  try {
    app.listen(port, console.log(`✅✅✅ server started on port ${port}`));
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
