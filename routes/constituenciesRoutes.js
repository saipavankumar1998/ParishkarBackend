const express = require('express');
const { addConstituency, getConstituencyById, getConstituencies, updateConstituency } = require('../controllers/constituenciesController');

const router = express.Router();

router.post('/addConstituency', addConstituency); // Add a new constituency
router.get('/getConstituencyById/:id', getConstituencyById); // Fetch constituency by ID
router.get('/getConstituencies', getConstituencies); // Fetch all constituencies
router.patch('/updateConstituency/:id', updateConstituency); // Update a constituency by ID

module.exports = router;
