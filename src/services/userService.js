import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExit = await checkUserEmail(email);
      if (isExit) {
        // user already exits
        let user = await db.User.findOne({
          attributes: ["fullNameUser", "emailUser", "typeRole", "passwordUser"],
          where: { emailUser: email },
          raw: true,
        });

        if (user) {
          // compare password
          let check = await bcrypt.compareSync(password, user.passwordUser);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Welcome";
            delete user.passwordUser;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Your password is wrong";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User isn't exits";
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = "Your account not exist";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { emailUser: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (passwordUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = bcrypt.hashSync(passwordUser, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["passwordUser"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        let checkEmail = await checkUserEmail(data.emailUser);
        if (!checkEmail) {
          let hashPasswordFromBcrypt = await hashUserPassword(
            data.passwordUser
          );
          await db.User.create({
            fullNameUser: data.fullNameUser,
            emailUser: data.emailUser,
            passwordUser: hashPasswordFromBcrypt,
            phoneUser: data.phoneUser,
            genderUser: data.genderUser === "1" ? true : false,
            adressUser: data.adressUser,
            typeRole: data.typeRole,
          });
          resolve({
            errCode: 0,
            message: "User was created successfully!",
          });
        } else {
          resolve({
            errCode: 1,
            message: "Your email existed!",
          });
        }
      } else {
        resolve({
          errCode: 2,
          message: "Data aren't founded!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required params",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (user) {
        let checkEmail = await checkUserEmail(data.emailUser);
        if (!checkEmail) {
          user.fullNameUser = data.fullNameUser;
          user.emailUser = data.emailUser;
          user.passwordUser = data.passwordUser;
          user.phoneUser = data.phoneUser;
          user.genderUser = data.genderUser;
          user.adressUser = data.adressUser;
          user.idRole = data.idRole;

          await user.save();
          resolve({
            errCode: 0,
            message: " was updated successfully!",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: `Email existed! Please try another email!`,
          });
        }
      } else {
        resolve({ errCode: 3, errMessage: "User not found!" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: "User isn't exist",
        });
      }

      await db.User.destroy({
        where: { id: userId },
      });

      resolve({ errCode: 0, message: " was deleted!" });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  checkUserEmail: checkUserEmail,
  handleUserLogin: handleUserLogin,
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
