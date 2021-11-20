import express from "express";
import path from "path";
import dotenv from "dotenv";
import { engine } from "express-handlebars";
import mongoose from 'mongoose'
import Recipe from './models/recipeModel.js'

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/public')));

// Mongoose connection
mongoose.connect(
   process.env.DB_URI,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   ()=>{
      console.log('Connected to DB')
   }
)

// Templating engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// Routes
app.get("/", async(req, res) => {
   try {
      
      const recipes = await Recipe.find({}).lean()

      res.render("home", { title:'Recipe App', recipes });
   } catch (error) {
      console.log('error')
   }

});

app.get("/about", (req, res) => {
  res.render("about");
});

const PORT = process.env.PORT || 6500;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
