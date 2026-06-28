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


const getProposals = async(req,res)=>{
   try {Proposal.find({user:req.user._id}).then((proposals)=>{
        res.status(200).json({
            message:"Proposals fetched successfully",
            proposals
        })
    })}catch(error){
      res.status(500).json({
        message:error.message,
      })
    }
}

const getProposalById = async(req,res)=>{
  try{
    Proposal.findById(req.params.id).then((proposal)=>{
      req.user._id.toString()===proposal.user.toString()?res.status(200).json({
        message:"Proposal fetched successfully",
        proposal
      }):res.status(403).json({
        message:"You are not authorized to view this proposal"
      })
    })
  }catch(error){
    res.status(500).json({
      message:error.message
    })

  }
}

module.exports = {
  createProposal,
  getProposals,
  getProposalById,
};
