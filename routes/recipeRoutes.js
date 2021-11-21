import express from "express";
import { getRecipeById, getRecipes } from "../controllers/recipeControllers.js";

const router = express.Router();

router.route("").get(getRecipes);
router.route("/recipe/:id").get(getRecipeById);

export default router;
