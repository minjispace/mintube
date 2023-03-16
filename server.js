// packages import
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

//  middleware import
import {notFoundMiddleware, errorHandlerMiddleware} from "./middlewares/index.js";

//  router import
import authRouter from "./routes/authRoute.js";
import videoRouter from "./routes/videoRoute.js";
import commentRouter from "./routes/commentRoute.js";

// prisma import
import {PrismaClient} from "@prisma/client";

// --------------------------------------
//  env setup
dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// app setup
const app = express();
const port = process.env.PORT || 5000;
const base_url = "/api/v1";
const prisma = new PrismaClient();

// extra packages middleware setup
app.set("trust proxy", 1);
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors(corsOptions));
app.use(cookieParser(process.env.JWT_SECRET));

// routes setup
app.get("/", (req, res) => {
  res.json({msg: "welcome mintube server"});
});
app.use(`${base_url}/auth`, authRouter);
app.use(`${base_url}/video`, videoRouter);
app.use(`${base_url}/comment`, commentRouter);

// 🔥 error middleware 항상 마지막 미들웨어에 위치 🔥
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start server
const startServer = async () => {
  // Connect to PostgreSQL using Prisma
  prisma
    .$connect()
    .then(() => {
      console.log("✅ Connected to mysql database");

      // Start the Express server once the database connection is established
      app.listen(port, () => {
        console.log(`✅ Express server listening on port : ${port}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database:", err);
    });
};

startServer();
