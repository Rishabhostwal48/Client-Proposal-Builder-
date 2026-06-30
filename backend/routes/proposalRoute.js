const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {createProposal,getProposals,getProposalById,updateProposal} = require('../controllers/proposalController');

router.post('/create', protect, createProposal);

router.get('/list',protect, getProposals);
router.get('/:id',protect, getProposalById);
router.put('/:id',protect, updateProposal); 

module.exports = router;