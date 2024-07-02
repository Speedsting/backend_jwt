import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/userRoute.js";
import { expressjwt } from "express-jwt";

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(
    () => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    },
    (error) => {
        console.log("Error connecting to MongoDB", error);
    }
).catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

app.use("/api/user", router);

let jwtMW = expressjwt({
    secret: "hello3",
    algorithms: [ "HS256" ]
});

app.use(jwtMW);