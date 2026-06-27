const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  clientName: {
    type: String,
    require: true,
  },
  clientEmail: {
    type: String,
    require: true,
  },
  projectDescription: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  timeline: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    default: "Draft"
}
});

module.exports = mongoose.model("Proposal", proposalSchema);