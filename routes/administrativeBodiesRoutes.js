const express = require('express');
const { addAdministrativeBody, getAdministrativeBodyById, getAdministrativeBodies, updateAdministrativeBody } = require('../controllers/administrativeBodiesController');

const router = express.Router();

router.post('/addAdministrativeBody', addAdministrativeBody); // Add a new administrative body
router.get('/getAdministrativeBodyById/:id', getAdministrativeBodyById); // Fetch administrative body by ID
router.get('/getAdministrativeBodies', getAdministrativeBodies); // Fetch all administrative bodies
router.patch('/updateAdministrativeBody/:id', updateAdministrativeBody); // Update an administrative body by ID

module.exports = router;
