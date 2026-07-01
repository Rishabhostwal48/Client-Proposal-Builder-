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
      message: "Proposal creaated successfully",
      proposal,
    });
  } catch {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProposals = async (req, res) => {
  try {
    Proposal.find({ user: req.user._id }).then((proposals) => {
      res.status(200).json({
        message: "Proposals fetched successfully",
        proposals,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProposalById = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }
    const isUser = req.user._id.toString() === proposal.user.toString();
    if (isUser) {
      return res.status(200).json({
        message: "Proposal fetched successfully",
        proposal,
      });
    } else {
      return res.status(403).json({
        message: "You are not authorized to view this proposal",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProposal = async (req,res) =>{
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found",
      });
    }
    const isUser = req.user._id.toString() === proposal.user.toString();
    if (isUser) {
      const updatedProposal = await Proposal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json({
        message: "Proposal updated successfully",
        proposal: updatedProposal,
      });
    } else {
      return res.status(403).json({
        message: "You are not authorized to view this proposal",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
const deleteProposal = async (req, res) => {
  try{
     const proposal = await Proposal.findById(req.params.id)
     if(!proposal){
         return res.status(404).json({
             message:"Proposal not found"
         )}
     }
     const isUser = req.user._id.toString()===proposal.user.toString()
     if(isUser){
        const deleteProposal = await proposal.deleteOne()
    }
    else{
       return res.status(403).json({
         message : "You are not authorised to deletethe proposal"
})
}
  }
  catch(error){
     res.status(500).json({
       message : error.message
     })
   
  }
};

module.exports = {
  createProposal,
  getProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
};
