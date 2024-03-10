import licenseService from "../services/licenseService";

const handleGetAllLicense = async (req, res) => {
  const licenseList = await licenseService.getAllLicense();

  return res.status(200).json(licenseList);
};

const handleCreateLicense = async (req, res) => {
  const message = await licenseService.createLicense(req.body);
  return res.status(200).json(message);
};

const handleAuthenticateLicense = async (req, res) => {
  const result = await licenseService.authenticateLicense(req.body.infoStore);
  return res.status(200).json(result);
};

const handleEditLicense = async (req, res) => {
  const data = req.body;
  const message = await licenseService.updateProduct(data);
  return res.status(200).json(message);
};

const handleDeleteLicense = async (req, res) => {
  const id = req.body.idItem;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required params",
    });
  }

  const message = await licenseService.deleteProductById(id);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllLicense: handleGetAllLicense,
  handleCreateLicense: handleCreateLicense,
  handleAuthenticateLicense: handleAuthenticateLicense,
  handleEditLicense: handleEditLicense,
  handleDeleteLicense: handleDeleteLicense,
};
