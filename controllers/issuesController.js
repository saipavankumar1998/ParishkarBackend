const db = require('../config/firebase');
import utilController from './utils/controllerUtils/genericControllerMethods';

//Get all issues
const getIssues = async (req, res) => {
    try {
        const docRef = await db.collection('Issues').get();

        const issues = docRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({
            data: {
                status: '1',
                message: 'Issues fetched successfully',
                issues,
            },
        });
    } catch (error) {
        console.error('Error fetching Issues:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching issues',
                error: error.message,
            },
        });
    }
};

//Get issue by Id
const getIssueById = async (req, res) => {
    try {
        console.log('Issue ID:', req.params.id);

        const docRef = await db.collection('Issues').doc(req.params.id).get();

        if (!docRef.exists) {
            return res.status(404).json({
                data: {
                    status: '0',
                    message: 'Issue not found',
                },
            });
        }

        const issue = docRef.data();

        res.json({
            data: {
                status: '1',
                message: 'Issue fetched successfully',
                id: docRef.id,
                issue,
            },
        });
    } catch (error) {
        console.error('Error fetching Issue:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching issue',
                error: error.message,
            },
        });
    }
};


//Get issue by Id
const addIssue = async (req, res) => {
    const { issueId, title, description, imageUrl, location, administrativeId, departmentId, citizenId, status, priority, assignedTo } = req.body;

    // Validate required fields
    if (!issueId || !title || !description || !location || !administrativeId || !departmentId || !citizenId) {
        return res.status(400).json({
            data: {
                status: '0',
                message: 'All required fields must be provided.',
            },
        });
    }

    try {
        const newIssue = {
            issueId,
            title,
            description,
            imageUrl: imageUrl || '', // Default to empty string
            location,
            administrativeId,
            departmentId,
            citizenId,
            status: status || 'Pending', // Default status
            priority: priority || 'Medium', // Default priority
            assignedTo: assignedTo || '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const docRef = await db.collection('Issues').add(newIssue);

        res.json({
            data: {
                status: '1',
                message: 'Issue added successfully',
                id: docRef.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error adding issue',
                error: error.message,
            },
        });
    }
};

const updateIssue = utilController.updateHandler('Issues');

const deleteIssue = utilController.deleteHandler('Issues');


module.exports = { addIssue, getIssueById, getIssues, updateIssue, deleteIssue };
