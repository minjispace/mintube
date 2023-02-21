// packages import
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';

//  middleware import
import {notFoundMiddleware, errorHandlerMiddleware} from './middlewares/index.js';

// --------------------------------------
//  env setup
dotenv.config();

// app setup
const app = express();
const port = process.env.PORT || 5000;

// extra packages middleware setup
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

// routes setup
app.get('/', (req, res) => {
  res.json({msg: 'welcome mintube server'});
});

// 🔥 error middleware 항상 마지막 미들웨어에 위치 🔥
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start server
const startServer = () => {
  app.listen(port, console.log(`server started on port ${port}`));
};

startServer();
