const express = require('express');
const { addArea, getAreaById, getAreas, updateAreaa} = require('../controllers/areasController');

const router = express.Router();

router.post('/addArea', addArea); // Add a new area
router.get('/getAreaById/:id', getAreaById); // Fetch an area by ID
router.get('/getAreas', getAreas); // Fetch all areas
router.patch('/updateArea/:id', updateArea); // Update an area by ID

module.exports = router;
