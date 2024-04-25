import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { jenisRouter } from "./routes/jenis";
import { tanamanRouter } from "./routes/tanaman";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/jenis", jenisRouter);
app.use("/tanaman", tanamanRouter);

export default app;
