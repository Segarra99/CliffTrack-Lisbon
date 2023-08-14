const { Schema, model } = require("mongoose");
const Review = require("./Review.model");

const climbingRouteSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true
      },
      grade: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true
      },
      pictures: {
        type: String,
        required: true
      },
      equipment: {
        type: [String],
      },
      reviews: [
        {
          type: Schema.Types.ObjectId,
          ref: Review
        }
      ]
    },
    {
      timestamps: true,
    }
);

const ClimbingRoute = model("ClimbingRoute", climbingRouteSchema);

module.exports = ClimbingRoute;