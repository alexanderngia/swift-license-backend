"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWebRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _licenseController = require("../controllers/licenseController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import userController from "../controllers/userController";

var router = _express["default"].Router();
var initWebRoutes = exports.initWebRoutes = function initWebRoutes(app) {
  // // API AUTHENTICATE
  // router.post("/api/auth/signin", userController.handleLogin);
  // router.post("/api/auth/signup", userController.handleRegister);

  // // API USER
  // router.get("/api/user", userController.handleGetAllUser);
  // router.put("/api/user/edit", userController.handleEditUser);
  // router.delete("/api/user/delete", userController.handleDeleteUser);

  // API LICENSE KEY
  router.get("/api/license-key", _licenseController.licenseController.handleGetAllLicense);
  router.post("/api/license-key/create", _licenseController.licenseController.handleCreateLicense);
  router.post("/api/license-key/authenticate", _licenseController.licenseController.handleAuthenticateLicense);
  router.put("/api/license-key/edit", _licenseController.licenseController.handleEditLicense);
  router["delete"]("/api/license-key/delete", _licenseController.licenseController.handleDeleteLicense);
  return app.use("/", router);
};