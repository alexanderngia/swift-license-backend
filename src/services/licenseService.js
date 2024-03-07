import db from "../models/index";

let getAllLicense = () => {
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

let createLicense = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        await db.Products.create({
          idItem: data.idItem,
          imgItem: data.imgItem,
          urlItem: data.urlItem,
          nameItem: data.nameItem,
          bodyItem: data.bodyItem,
          bodyHtmlItem: data.bodyHtmlItem,
          qualityItem: data.qualityItem,
          colorItem: data.colorItem,
          sizeItem: data.sizeItem,
          priceItem: data.priceItem,
          categoryItem: data.categoryItem,
          keywordTagItem: data.keywordTagItem,
          titleTagItem: data.titleTagItem,
          descripTagItem: data.descripTagItem,
          authorItem: data.authorItem,
        });
        resolve({
          errCode: 0,
          message: ` was created successfully!`,
        });
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

let updateLicense = (data) => {
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

let deleteLicenseById = (productId) => {
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
  updateLicense: updateLicense,
  deleteLicenseById: deleteLicenseById,
};
