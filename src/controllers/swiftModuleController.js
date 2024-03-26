import { swiftModuleService } from "../services/swiftModuleService.js";

const handleGetCode = async (req, res) => {
  const data = await swiftModuleService.getCode();

  return res.status(200).json(data);
};

const handleEditCode = async (req, res) => {
  const data = req.body;
  const message = await swiftModuleService.updateCode(data);
  return res.status(200).json(message);
};

export const swiftModuleController = {
  handleGetCode: handleGetCode,
  handleEditCode: handleEditCode,
};
