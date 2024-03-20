import db from "../models/index.js";
const getHomePage = async (req, res) => {
  try {
    let data = await db.License.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
export const homeController = {
  getHomePage: getHomePage,
};
