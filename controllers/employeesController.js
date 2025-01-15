const db = require('../config/firebase');
import utilController from './utils/controllerUtils/genericControllerMethods';

const getEmployees = async (req, res) => {
    try {
        const docRef = await db.collection('Employees').get();

        const employees = docRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({
            data: {
                status: '1',
                message: 'Employees fetched successfully',
                employees,
            },
        });
    } catch (error) {
        console.error('Error fetching Employees:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching employees',
                error: error.message,
            },
        });
    }
};

///Get Employee by ID
const getEmployeeById = async (req, res) => {
    try {
        console.log('Employee ID:', req.params.id);

        const docRef = await db.collection('Employees').doc(req.params.id).get();

        if (!docRef.exists) {
            return res.status(404).json({
                data: {
                    status: '0',
                    message: 'Employee not found',
                },
            });
        }

        const employee = docRef.data();

        res.json({
            data: {
                status: '1',
                message: 'Employee fetched successfully',
                id: docRef.id,
                employee,
            },
        });
    } catch (error) {
        console.error('Error fetching Employee:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching employee',
                error: error.message,
            },
        });
    }
};

//Add employee
const addEmployee = async (req, res) => {
    const { employeeId, name, departmentId, role, administrativeBodyId, contactDetails, assignedIssues } = req.body;

    // Validate required fields
    if (!employeeId || !name || !departmentId || !role || !administrativeBodyId || !contactDetails) {
        return res.status(400).json({
            data: {
                status: '0',
                message: 'All required fields must be provided.',
            },
        });
    }

    try {
        const newEmployee = {
            employeeId,
            name,
            departmentId,
            role,
            administrativeBodyId,
            contactDetails,
            assignedIssues: assignedIssues || [], // Default to empty array
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const docRef = await db.collection('Employees').add(newEmployee);

        res.json({
            data: {
                status: '1',
                message: 'Employee added successfully',
                id: docRef.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error adding employee',
                error: error.message,
            },
        });
    }
};

const updateEmployee = utilController.updateHandler('Employees');

module.exports = { addEmployee, getEmployeeById, getEmployees, updateEmployee }; 