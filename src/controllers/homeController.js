import db from "../models/index.js";
const getHomePage = async (req, res) => {
  try {
    let data = await db.License.findAll();
    let code = await db.SwiftModule.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
      code: JSON.stringify(code),
    });
  } catch (error) {
    console.log(error);
  }
};
export const homeController = {
  getHomePage: getHomePage,
};
