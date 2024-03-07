import licenseService from "../services/licenseService";

let handleGetAllLicense = async (req, res) => {
  let licenseList = await licenseService.getAllLicense();

  return res.status(200).json(licenseList);
};

let handleCreateLicense = async (req, res) => {
  let message = await licenseService.createProduct(req.body);
  return res.status(200).json(message);
};

let handleEditLicense = async (req, res) => {
  let data = req.body;
  let message = await licenseService.updateProduct(data);
  return res.status(200).json(message);
};

let handleDeleteLicense = async (req, res) => {
  let id = req.body.idItem;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required params",
    });
  }

  let message = await licenseService.deleteProductById(id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllLicense: handleGetAllLicense,
  handleCreateLicense: handleCreateLicense,
  handleEditLicense: handleEditLicense,
  handleDeleteLicense: handleDeleteLicense,
};
