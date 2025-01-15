const express = require('express');
const { addIssue, getIssueById, getIssues, updateIssue, deleteIssue } = require('../controllers/issuesController');

const router = express.Router();

router.post('/addIssue', addIssue); // Add a new issue
router.get('/getIssueById/:id', getIssueById); // Fetch issue by ID
router.get('/getIssues', getIssues); // Fetch all issues
router.patch('/updateIssue/:id', updateIssue); // Update an issue by ID
router.delete('/deleteIssue/:id', deleteIssue); // Delete an issue by ID

module.exports = router;
