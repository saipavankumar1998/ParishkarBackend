const express = require('express');
const { addConstituency, getConstituencyById, getConstituencies } = require('../controllers/constituencyController');

const router = express.Router();

router.post('/addConstituency', addConstituency); // Add a new constituency
router.get('/getConstituencyById/:id', getConstituencyById); // Fetch constituency by ID
router.get('/getConstituencies', getConstituencies); // Fetch all constituencies

module.exports = router;
