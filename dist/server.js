"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = require("./config/viewEngine.js");
var _web = require("./route/web.js");
var _connectDB = require("./config/connectDB.js");
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// Allow CORS
app.use((0, _cors["default"])({
  origin: true
}));

// Config app
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _viewEngine.configViewEngine)(app);
(0, _web.initWebRoutes)(app);
(0, _connectDB.connectDB)();

// Port

var port = process.env.PORT || 6333;
app.listen(port, function () {
  //callback
  console.log("backend nodejs is running on the port:" + port);
});