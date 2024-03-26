"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWebRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeController = require("../controllers/homeController.js");
var _licenseController = require("../controllers/licenseController.js");
var _swiftModuleController = require("../controllers/swiftModuleController.js");
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import userController from "../controllers/userController";

var router = _express["default"].Router();
var allowlist = ["".concat(process.env.DOMAIN_CLIENT), "http://localhost:3000/"];
var corsOptionsDelegate = function corsOptionsDelegate(req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true
    }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = {
      origin: false
    }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
var initWebRoutes = exports.initWebRoutes = function initWebRoutes(app) {
  router.get("/", (0, _cors["default"])(corsOptionsDelegate), _homeController.homeController.getHomePage);
  // // API AUTHENTICATE
  // router.post("/api/auth/signin", userController.handleLogin);
  // router.post("/api/auth/signup", userController.handleRegister);

  // // API USER
  // router.get("/api/user", userController.handleGetAllUser);
  // router.put("/api/user/edit", userController.handleEditUser);
  // router.delete("/api/user/delete", userController.handleDeleteUser);

  // API LICENSE KEY
  router.get("/api/license-key", (0, _cors["default"])(corsOptionsDelegate), _licenseController.licenseController.handleGetAllLicense);
  router.post("/api/license-key/create", (0, _cors["default"])(corsOptionsDelegate), _licenseController.licenseController.handleCreateLicense);
  router.post("/api/license-key/authenticate", (0, _cors["default"])(corsOptionsDelegate), _licenseController.licenseController.handleAuthenticateLicense);
  router.put("/api/license-key/edit", (0, _cors["default"])(corsOptionsDelegate), _licenseController.licenseController.handleEditLicense);
  router["delete"]("/api/license-key/delete", (0, _cors["default"])(corsOptionsDelegate), _licenseController.licenseController.handleDeleteLicense);

  //API MODULE THEME
  router.get("/api/module-theme", (0, _cors["default"])(corsOptionsDelegate), _swiftModuleController.swiftModuleController.handleGetCode);
  router.put("/api/module-theme/update", (0, _cors["default"])(corsOptionsDelegate), _swiftModuleController.swiftModuleController.handleEditCode);
  return app.use("/", router);
};