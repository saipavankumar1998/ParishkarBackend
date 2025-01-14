const express = require('express');
const { addArea, getAreaById, getAreas } = require('../controllers/areaController');

const router = express.Router();

router.post('/addArea', addArea); // Add a new area
router.get('/getAreaById/:id', getAreaById); // Fetch an area by ID
router.get('/getAreas', getAreas); // Fetch all areas

module.exports = router;
