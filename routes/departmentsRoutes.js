const express = require('express');
const { addDepartment, getDepartmentById, getDepartments, updateDepartment } = require('../controllers/departmentsController');

const router = express.Router();

router.post('/addDepartment', addDepartment); // Add a new department
router.get('/getDepartmentById/:id', getDepartmentById); // Fetch department by ID
router.get('/getDepartments', getDepartments); // Fetch all departments
router.patch('/updateDepartment/:id', updateDepartment); // Update a department by ID

module.exports = router;
