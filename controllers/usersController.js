const { db } = require('../config/firebase');
import utilController from './controllerUtils/genericControllerMethods';

// Fetch user by UserId
const getUserById = async (req, res) => {
    try {
        console.log('User ID:', req.params.id); // Debug log
        const userDoc = await db.collection('users').doc(req.params.id).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        res.json({ 
            data: {
            status: '1',
            message: 'User fetched successfully',
            id: userDoc.id, ...userData
            } 
        });

    } catch (error) {
        console.error('Error fetching user:', error); // Debug log
        res.status(500).json({ 
            data : {
                status: '0',
                message: 'Error fetching users', 
                error: error.message
            } 
        });
    }
};


// Fetch all users
const getUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json({ 
            data: {
                status: '1',
                message: 'User fetched successfully',
                users
            } 
        });

    } catch (error) {
        res.status(500).json({ 
            data : {
                status: '0',
                message: 'Error fetching users', 
                error: error.message
            }
        });
    }
};

// Add a new user to Firestore
const addUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        db.collection;
        const docRef = await db.collection('users').add({ name, email });
        res.json({
            data : {
                status: '1',
                message: 'User added successfully',
                id: docRef.id 
            }
        });
    } catch (error) {
        res.status(500).json({ 
            data : {
                status: '0',
                message: 'Error adding user', 
                error: error.message
            }
        });
    }
};

const updateUser = utilController.updateHandler('users'); 

const deleteUser = utilController.deleteHandler('users');

module.exports = { getUserById, getUsers, addUser, updateUser, deleteUser };
