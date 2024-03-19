import express from "express";
// import userController from "../controllers/userController";
import { licenseController } from "../controllers/licenseController.js";

let router = express.Router();

export const initWebRoutes = (app) => {
  // // API AUTHENTICATE
  // router.post("/api/auth/signin", userController.handleLogin);
  // router.post("/api/auth/signup", userController.handleRegister);

  // // API USER
  // router.get("/api/user", userController.handleGetAllUser);
  // router.put("/api/user/edit", userController.handleEditUser);
  // router.delete("/api/user/delete", userController.handleDeleteUser);

  // API LICENSE KEY
  router.get("/api/license-key", licenseController.handleGetAllLicense);
  router.post("/api/license-key/create", licenseController.handleCreateLicense);
  router.post(
    "/api/license-key/authenticate",
    licenseController.handleAuthenticateLicense
  );
  router.put("/api/license-key/edit", licenseController.handleEditLicense);
  router.delete(
    "/api/license-key/delete",
    licenseController.handleDeleteLicense
  );

  return app.use("/", router);
};
