// Import dependencies
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import Recipe from "./models/recipeModel.js";

dotenv.config();

// Initialize express
const app = express();

// Set static folders
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/public")));

// Mongoose connection
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

// Templating engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    partialsDir: `${__dirname}/views/partials/`,
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

// Routes
app.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({}).lean();

    return res.render("home", { title: "Recipes", recipes });
  } catch (error) {
    console.log("error");
    return res.render("422Page", { title: "Error 422" });
  }
});

app.get("/recipe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).lean();

    return res.render("recipe", { title: "Recipes", recipe });
  } catch (error) {
    console.log("error");
    return res.render("422Page", { title: "Error 422" });
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

const PORT = process.env.PORT || 6500;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
