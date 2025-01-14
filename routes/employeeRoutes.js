const express = require('express');
const { addEmployee, getEmployeeById, getEmployees } = require('../controllers/employeeController');

const router = express.Router();

router.post('/addEmployee', addEmployee); // Add a new employee
router.get('/getEmployeeById/:id', getEmployeeById); // Fetch employee by ID
router.get('/getEmployees', getEmployees); // Fetch all employees

module.exports = router;
