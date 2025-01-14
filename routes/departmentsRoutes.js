const express = require('express');
const { addDepartment, getDepartmentById, getDepartments } = require('../controllers/departmentController');

const router = express.Router();

router.post('/addDepartment', addDepartment); // Add a new department
router.get('/getDepartmentById/:id', getDepartmentById); // Fetch department by ID
router.get('/getDepartments', getDepartments); // Fetch all departments

module.exports = router;
