import db from "../models/index.js";
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
        const isExit = await checkDomain(data);
        if (!isExit) {
          const hashedLicenseKey = await hashLicense(data.domain);
          await db.License.create({
            licenseStatus: data.status,
            customerName: data.name,
            customerEmail: data.email,
            domain: data.domain,
            shopId: data.shopId,
            licenseKey: `LIC-${hashedLicenseKey}_key`,
          });

          const newLicense = await db.License.findOne({
            where: {
              domain: data.domain,
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
const checkDomain = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExit = await db.License.findOne({
        where: {
          domain: data.domain,
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
      if (!data) {
        resolve({
          errCode: 3,
          errMessage: "Missing data from api!",
          themeStatus: false,
        });
      }
      if (!data.activeKey) {
        resolve({
          errCode: 0,
          errMessage: "Missing license key",
          themeStatus: false,
        });
      }
      if (!data.shopDomain) {
        resolve({
          errCode: 0,
          errMessage: "Missing domain params",
          themeStatus: false,
        });
      }
      if (!data.shopId) {
        resolve({
          errCode: 0,
          errMessage: "Missing shop id params",
          themeStatus: false,
        });
      }

      const isLicenseExit = await db.License.findOne({
        where: {
          licenseKey: data.activeKey,
        },
        raw: false,
      });

      if (!isLicenseExit) {
        resolve({
          errCode: 1,
          errMessage: "License was not existed!",
          themeStatus: false,
        });
      }
      // license chưa được active

      if (
        isLicenseExit.licenseStatus === 0 &&
        isLicenseExit.domain === data.shopDomain
      ) {
        if (isLicenseExit.shopId === null) {
          isLicenseExit.shopId = data.shopId;
          isLicenseExit.licenseStatus = 1;
          await isLicenseExit.save();
          resolve({
            message: "Active theme successfully!",
            themeStatus: true,
          });
        }
      }
      // license đã được active
      if (isLicenseExit.licenseStatus === 1) {
        if (isLicenseExit.shopId === data.shopId) {
          if (isLicenseExit.domain !== data.shopDomain) {
            isLicenseExit.domain = data.shopDomain;
            await isLicenseExit.save();
          }

          resolve({
            message: "Theme is working successfully!",
            themeStatus: true,
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "License already was used!",
            themeStatus: false,
          });
        }
      }
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

const deleteLicenseById = (licenseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let license = await db.License.findOne({
        where: { id: licenseId },
      });
      if (!license) {
        resolve({
          errCode: 1,
          errMessage: "License isn't exist",
        });
      }

      await db.License.destroy({
        where: { id: licenseId },
      });

      resolve({ errCode: 0, message: " was deleted!" });
    } catch (error) {
      reject(error);
    }
  });
};
export const licenseService = {
  getAllLicense: getAllLicense,
  createLicense: createLicense,
  authenticateLicense: authenticateLicense,
  updateLicense: updateLicense,
  deleteLicenseById: deleteLicenseById,
};
