const Proposal = require("../models/Proposal");

const createProposal = async (req, res) => {
  try {
    const {
      title,
      clientName,
      clientEmail,
      projectDescription,
      price,
      timeline,
    } = req.body;
    const user = req.user._id;

    const proposal = await Proposal.create({
      title,
      clientName,
      clientEmail,
      projectDescription,
      price,
      timeline,
      user,
    });

    res.status(201).json({
        message:"Proposal creaated successfully",
        proposal
    })
  } catch {
       res.status(500).json({
        message: error.message
    });
  }
  
};

module.exports = {
  createProposal,
};
