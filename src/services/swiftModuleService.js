import db from "../models/index.js";

const getCode = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let code = await db.SwiftModule.findAll({});
      resolve({
        errCode: 0,
        message: `Data was loaded successfully!`,
        code,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateCode = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required params",
        });
      }

      let code = await db.SwiftModule.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (code) {
        code.codeModule = data.code;

        await code.save();
        resolve({
          errCode: 0,
          message: "Module was updated successfully!",
        });
      } else {
        resolve({ errCode: 3, errMessage: "Code not found!" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const swiftModuleService = {
  getCode: getCode,
  updateCode: updateCode,
};
