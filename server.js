import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectdb } from "./connectdb.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./routers/categoryRouter.js";
import productRoute from "./routers/productRouter.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import uploadRouter from "./routers/upload.js";
import orderRoute from "./routers/orderRouter.js";
import adminRouter from "./routers/adminRouter.js";

const app = express();
const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "https://fsstecom.netlify.app/", // 🔥 sabse important
//     credentials: true,
//   }),
// );
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fsstecom.netlify.app"],
    credentials: true,
  }),
);

// app.options("*", cors());

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

//cookie parser
app.use(cookieParser());

//ConnectDB
connectdb();

//routes
app.use("/user", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRoute);
app.use("/api", uploadRouter);
app.use("/api", orderRoute);
app.use("/api", adminRouter);

app.listen(port, () => {
  console.log("server is started at port 5000");
});
