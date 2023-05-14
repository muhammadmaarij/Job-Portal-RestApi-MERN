var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  skills: {
    type: [String],
  },
  portfolio: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      languages: {
        type: [String],
      },
    },
  ],
  last_degree: {
    type: String,
  },
  applied_at: [
    {
      job_id: {
        type: mongoose.Types.ObjectId,
        ref: "Job",
      },
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
