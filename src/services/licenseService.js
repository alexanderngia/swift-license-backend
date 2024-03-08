import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const getAllLicense = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let licenseList = await db.License.findAll({});
      resolve({
        errCode: 0,
        message: `Data was loaded successfully!`,
        licenseList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const createLicense = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        const isExit = await checkLicense(data);
        if (!isExit) {
          const hashedLicenseKey = await hashLicense(data.domain);
          await db.License.create({
            licenseStatus: data.status,
            customerName: data.name,
            customerEmail: data.email,
            domain: data.domain,
            shopId: data.shopId,
            licenseKey: hashedLicenseKey,
          });

          const newLicense = await db.License.findOne({
            where: {
              licenseKey: hashedLicenseKey,
            },
          });
          if (newLicense) {
            resolve({
              errCode: 0,
              message: `License was created successfully!`,
              newLicense,
            });
          }
        } else {
          resolve({
            errCode: 1,
            message: `Domain was existed!`,
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
const checkLicense = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check xem license có tồn tại hay không
      const isExit = await db.License.findOne({
        where: {
          licenseKey: data.activationKey,
        },
      });
      if (isExit) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const hashLicense = (domain) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = bcrypt.hashSync(domain, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

const authenticateLicense = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        if (!data.activationKey) {
          resolve({
            errCode: 2,
            errMessage: "Missing license key",
            themeStatus: false,
          });
        }

        const isExit = await db.License.findOne({
          where: {
            licenseKey: data.activationKey,
          },
          raw: false,
        });
        if (isExit) {
          // check shopId
          // có shopid
          // chưa có shopId
          // update shopId + active status
        } else {
        }
      }
      const hash = bcrypt.hashSync(domain, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

const updateLicense = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required params",
        });
      }

      let product = await db.Products.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (product) {
        product.idItem = data.idItem;
        product.imgItem = data.imgItem;
        product.urlItem = data.urlItem;
        product.nameItem = data.nameItem;
        product.bodyItem = data.bodyItem;
        product.bodyHtmlItem = data.bodyHtmlItem;
        product.qualityItem = data.qualityItem;
        product.colorItem = data.colorItem;
        product.sizeItem = data.sizeItem;
        product.priceItem = data.priceItem;
        product.categoryItem = data.categoryItem;
        product.keywordTagItem = data.keywordTagItem;
        product.titleTagItem = data.titleTagItem;
        product.descripTagItem = data.descripTagItem;
        product.authorItem = data.authorItem;

        await product.save();
        resolve({
          errCode: 0,
          message: " was updated successfully!",
        });
      } else {
        resolve({ errCode: 3, errMessage: "Product not found!" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteLicenseById = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.Products.findOne({
        where: { idItem: productId },
      });
      if (!product) {
        resolve({
          errCode: 1,
          errMessage: "Product isn't exist",
        });
      }

      await db.Products.destroy({
        where: { idItem: productId },
      });

      resolve({ errCode: 0, message: " was deleted!" });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllLicense: getAllLicense,
  createLicense: createLicense,
  authenticateLicense: authenticateLicense,
  updateLicense: updateLicense,
  deleteLicenseById: deleteLicenseById,
};
