const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let exercise = new Schema(
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
  { collection: "Workout" }
);
module.exports = mongoose.model("exercises", exercise);