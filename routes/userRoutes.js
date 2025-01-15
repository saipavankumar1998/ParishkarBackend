const express = require('express');
const { getUserById, getUsers, addUser, updateUser, deleteUser } = require('../controllers/usersController');

const router = express.Router();

router.get('/getUsers', getUsers);
router.get('/getUserById/:id', getUserById);
router.post('/addUser', addUser);
router.patch('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;