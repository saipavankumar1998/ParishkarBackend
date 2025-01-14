const { db } = require('../config/firebase');

// Add a new Department
const addDepartment = async (req, res) => {
    const { departmentId, name, description, employees_count } = req.body;

    // Validate required fields
    if (!departmentId || !name || !description || !employees_count) {
        return res.status(400).json({
            data: {
                status: '0',
                message: 'departmentId, name, description, and employees_count are required.',
            },
        });
    }

    try {
        // Create the new department object
        const newDepartment = {
            departmentId,
            name,
            description,
            employees_count,
            createdAt: new Date(), // Auto-generate timestamp
            updatedAt: new Date(), // Auto-generate timestamp
        };

        // Add the document to the "Departments" collection
        const docRef = await db.collection('Departments').add(newDepartment);

        res.json({
            data: {
                status: '1',
                message: 'Department added successfully',
                id: docRef.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error adding department',
                error: error.message,
            },
        });
    }
};

// Fetch Department by ID
const getDepartmentById = async (req, res) => {
    try {
        console.log('Department ID:', req.params.id);

        // Fetch the document
        const docRef = await db.collection('Departments').doc(req.params.id).get();

        if (!docRef.exists) {
            return res.status(404).json({
                data: {
                    status: '0',
                    message: 'Department not found',
                },
            });
        }

        const department = docRef.data();

        res.json({
            data: {
                status: '1',
                message: 'Department fetched successfully',
                id: docRef.id,
                department,
            },
        });
    } catch (error) {
        console.error('Error fetching Department:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching department',
                error: error.message,
            },
        });
    }
};

// Fetch All Departments
const getDepartments = async (req, res) => {
    try {
        // Fetch all documents in the "Departments" collection
        const docRef = await db.collection('Departments').get();

        const departments = docRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({
            data: {
                status: '1',
                message: 'Departments fetched successfully',
                departments,
            },
        });
    } catch (error) {
        console.error('Error fetching Departments:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching departments',
                error: error.message,
            },
        });
    }
};

module.exports = { addDepartment, getDepartmentById, getDepartments };

