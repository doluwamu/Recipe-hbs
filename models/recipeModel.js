import mongoose from "mongoose";

const Schema = mongoose.Schema;

const message = "This is a required field";

const reviewSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: [true, message] },
    rating: { type: Number, required: [true, message], default: 0 },
    comment: { type: String, required: [true, message] },
  },
  {
    timestamps: true,
  }
);

const recipeShema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: [true, message] },
    image: { type: String, required: [true, message] },
    ingredients: { type: Array, required: [true, message] },
    instructions: { type: Array, required: [true, message] },
    reviews: [reviewSchema],
    rating: { type: Number, required: [true, message], default: 0 },
    numReviews: { type: Number, required: [true, message], default: 0 },
    description: { type: String, required: [true, message] },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeShema);

export default Recipe;
