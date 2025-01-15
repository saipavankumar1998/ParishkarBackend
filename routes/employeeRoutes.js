const express = require('express');
const { addEmployee, getEmployeeById, getEmployees, updateEmployee } = require('../controllers/employeesController');

const router = express.Router();

router.post('/addEmployee', addEmployee); // Add a new employee
router.get('/getEmployeeById/:id', getEmployeeById); // Fetch employee by ID
router.get('/getEmployees', getEmployees); // Fetch all employees
router.patch('/updateEmployee/:id', updateEmployee); // Update an employee by ID

module.exports = router;
