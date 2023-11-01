import express from  "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
    path: "./config/config.env",
  });
  const app = express();


  // Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// Rotues 
import user from "./routes/userRoutes.js";
import form from "./routes/FormRoutes.js";
import response from "./routes/ResponseRoutes.js";
import extraMonth from "./routes/ExtraMonthRoutes.js"

app.use("/api/v1", user);
app.use("/api/v1", form);
app.use("/api/v1", response)
app.use("/api/v1", extraMonth)

app.use(ErrorMiddleware);
export default app;