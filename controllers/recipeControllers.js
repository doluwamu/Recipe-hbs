import Recipe from "../models/recipeModel.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).lean();

    return res.render("home", { title: "Recipes", recipes });
  } catch (error) {
    console.log("error");
    return res.render("422Page", { title: "Error 422" });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).lean();

    return res.render("recipe", { title: `Recipe/${id}`, recipe });
  } catch (error) {
    console.log("error");
    return res.render("422Page", { title: "Error 422" });
  }
};
