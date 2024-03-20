import express from "express";
// import userController from "../controllers/userController";
import { homeController } from "../controllers/homeController.js";
import { licenseController } from "../controllers/licenseController.js";
import cors from "cors";
import "dotenv/config";

let router = express.Router();

var allowlist = [`${process.env.DOMAIN_CLIENT}`, `http://localhost:3000/`];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

export const initWebRoutes = (app) => {
  router.get("/", cors(corsOptionsDelegate), homeController.getHomePage);
  // // API AUTHENTICATE
  // router.post("/api/auth/signin", userController.handleLogin);
  // router.post("/api/auth/signup", userController.handleRegister);

  // // API USER
  // router.get("/api/user", userController.handleGetAllUser);
  // router.put("/api/user/edit", userController.handleEditUser);
  // router.delete("/api/user/delete", userController.handleDeleteUser);

  // API LICENSE KEY
  router.get(
    "/api/license-key",
    cors(corsOptionsDelegate),
    licenseController.handleGetAllLicense
  );
  router.post(
    "/api/license-key/create",
    cors(corsOptionsDelegate),
    licenseController.handleCreateLicense
  );
  router.post(
    "/api/license-key/authenticate",
    cors(corsOptionsDelegate),
    licenseController.handleAuthenticateLicense
  );
  router.put(
    "/api/license-key/edit",
    cors(corsOptionsDelegate),
    licenseController.handleEditLicense
  );
  router.delete(
    "/api/license-key/delete",
    cors(corsOptionsDelegate),
    licenseController.handleDeleteLicense
  );

  return app.use("/", router);
};
