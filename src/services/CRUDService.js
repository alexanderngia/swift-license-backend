import db from "../models/index";

import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.passwordUser);
      await db.User.create({
        fullNameUser: data.fullNameUser,
        emailUser: data.emailUser,
        passwordUser: hashPasswordFromBcrypt,
        phoneUser: data.phoneUser,
        genderUser: data.genderUser === "1" ? true : false,
        adressUser: data.adressUser,
        idRole: data.idRole,
      });
      resolve("OK! create new user successfully");
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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.fullNameUser = data.fullNameUser;
        user.emailUser = data.emailUser;
        user.passwordUser = data.passwordUser;
        user.phoneUser = data.phoneUser;
        user.genderUser = data.genderUser;
        user.adressUser = data.adressUser;
        user.idRole = data.idRole;

        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
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

      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
