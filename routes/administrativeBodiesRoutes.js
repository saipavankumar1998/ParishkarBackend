const express = require('express');
const { addAdministrativeBody, getAdministrativeBodyById, getAdministrativeBodies } = require('../controllers/administrativeBodyController');

const router = express.Router();

router.post('/addAdministrativeBody', addAdministrativeBody); // Add a new administrative body
router.get('/getAdministrativeBodyById/:id', getAdministrativeBodyById); // Fetch administrative body by ID
router.get('/getAdministrativeBodies', getAdministrativeBodies); // Fetch all administrative bodies

module.exports = router;
