import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();

let app = express();

// Allow CORS
app.use(
  cors({
    origin: true,
  })
);

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

// Port

let port = process.env.PORT || 6333;

app.listen(port, () => {
  //callback
  console.log("backend nodejs is running on the port:" + port);
});
