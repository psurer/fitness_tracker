const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let exerciseSchema = new Schema(
  {
    type:{
        type: String
    },
    name: {
      type: String
    },
    duration: {
      type: Number
    },
    weight: {
      type: Number
    },
    reps:{
        type: Number
    },
    sets:{
        type: Number
    }
  },
);

let workoutSchema = new Schema({
  day: {
    type: Date
  },
  exercises:{
    type: [exerciseSchema]
  }
});
module.exports = mongoose.model("workout", workoutSchema);