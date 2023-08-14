const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
      rating: {
        type: Number,
        min: 0,
        max: 20,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      picture:{
        type: String
      }
    },
    {
      timestamps: true,
    }
);

const Review = model("Review", reviewSchema);

module.exports = Review;