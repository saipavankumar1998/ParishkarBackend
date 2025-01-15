const { db } = require('../config/firebase');
import utilController from './utils/controllerUtils/genericControllerMethods';

// Add a new Constituency
const addConstituency = async (req, res) => {
    const { name, mla, mp, administrative_bodies, mp_image, constituencyAreas, constituencyId, constituencyImage, constituencyType } = req.body;

    // Validate required fields
    if (!name || !constituencyId || !constituencyType) {
        return res.status(400).json({
            data: {
                status: '0',
                message: 'Name, constituencyId, and constituencyType are required.',
            },
        });
    }

    try {
        // Create the new constituency object
        const newConstituency = {
            name,
            mla: mla || '', // Default to empty string if not provided
            mp: mp || '', // Default to empty string if not provided
            administrative_bodies: administrative_bodies || [], // Default to empty array
            mp_image: mp_image || '', // Default to empty string
            constituencyAreas: constituencyAreas || [], // Default to empty array
            constituencyId,
            constituencyImage: constituencyImage || '', // Default to empty string
            constituencyType,
        };

        // Add the document to the "Constituencies" collection
        const docRef = await db.collection('Constituencies').add(newConstituency);

        res.json({
            data: {
                status: '1',
                message: 'Constituency added successfully',
                id: docRef.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error adding constituency',
                error: error.message,
            },
        });
    }
};

// Fetch Constituency by ID
const getConstituencyById = async (req, res) => {
    try {
        console.log('Constituency ID:', req.params.id);

        // Fetch the document
        const docRef = await db.collection('Constituencies').doc(req.params.id).get();

        if (!docRef.exists) {
            return res.status(404).json({
                data: {
                    status: '0',
                    message: 'Constituency not found',
                },
            });
        }

        const constituency = docRef.data();

        res.json({
            data: {
                status: '1',
                message: 'Constituency fetched successfully',
                id: docRef.id,
                constituency,
            },
        });
    } catch (error) {
        console.error('Error fetching Constituency:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching constituency',
                error: error.message,
            },
        });
    }
};

// Fetch All Constituencies
const getConstituencies = async (req, res) => {
    try {
        // Fetch all documents in the "Constituencies" collection
        const docRef = await db.collection('Constituencies').get();

        const constituencies = docRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({
            data: {
                status: '1',
                message: 'Constituencies fetched successfully',
                constituencies,
            },
        });
    } catch (error) {
        console.error('Error fetching Constituencies:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching constituencies',
                error: error.message,
            },
        });
    }
};

const updateConstituency = utilController.updateHandler('Constituencies');

module.exports = { addConstituency, getConstituencyById, getConstituencies, updateConstituency };
