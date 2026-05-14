import express from 'express';
import dotenv from 'dotenv';
import userRouter from "./routes/userRouter.ts";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(() => {
    console.log(`서버 실행됨! http://localhost:${process.env.PORT}`);
})