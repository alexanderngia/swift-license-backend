import express from "express";
import bodyParser from "body-parser";
import { configViewEngine } from "./config/viewEngine.js";
import { initWebRoutes } from "./route/web.js";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";

import "dotenv/config";
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

configViewEngine(app);
initWebRoutes(app);

connectDB();

// Port

let port = process.env.PORT || 6333;

app.listen(port, () => {
  //callback
  console.log("backend nodejs is running on the port:" + port);
});
