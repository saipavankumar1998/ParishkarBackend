const express = require('express');
const { addIssue, getIssueById, getIssues } = require('../controllers/issueController');

const router = express.Router();

router.post('/addIssue', addIssue); // Add a new issue
router.get('/getIssueById/:id', getIssueById); // Fetch issue by ID
router.get('/getIssues', getIssues); // Fetch all issues

module.exports = router;
