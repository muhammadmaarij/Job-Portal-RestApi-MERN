var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  skills: {
    type: [String],
  },
  experience: {
    type: Number,
  },
  expected_salary: {
    type: Number,
  },
});

module.exports = mongoose.model("Job", jobSchema);
