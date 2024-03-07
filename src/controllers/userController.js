import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.emailUser;
  let password = req.body.passwordUser;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing info",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  // Check existing email
  // Compare password
  // return user Info
  // access_token:JWT Json Web Token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUser = async (req, res) => {
  let id = req.query.id; // ALL, Id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleRegister = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required params",
    });
  }

  let message = await userService.deleteUserById(id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  handleGetAllUser: handleGetAllUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
