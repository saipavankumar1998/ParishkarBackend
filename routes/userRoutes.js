const express = require('express');
const {getUserById, getUsers, addUser} = require('../controllers/userController');

const router = express.Router();

router.get('/getUsers', getUsers);
router.get('/getUserById/:id', getUserById);
router.post('/addUser', addUser);

module.exports = router;