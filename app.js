// Import dependencies
import express from "express";
import path from "path";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import mongoose from "mongoose";
import hbsHelpers from "./helpers/hbsHelpers.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";

// hbsHelpers(hbs);
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
  hbs.engine({
    extname: ".hbs",
    partialsDir: `${__dirname}/views/partials/`,
    helpers: hbsHelpers,
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

// Routes
app.use("/", recipeRoutes);
app.use("/about", aboutRoutes);

const PORT = process.env.PORT || 6500;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
