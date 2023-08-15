const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
      content: {
        type: String,
        required: true
      },
      picture:{
        type: String
      },
      user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
      timestamps: true,
    }
);

const Review = model("Review", reviewSchema);

module.exports = Review;