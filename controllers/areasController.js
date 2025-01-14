const { db } = require('../config/firebase');

///Get area by ID
const getAreaById = async (req, res) => {
    try {
        console.log('Area ID:', req.params.id);

        // Fetch the document
        const docRef = await db.collection('Areas').doc(req.params.id).get();

        if (!docRef.exists) {
            return res.status(404).json({
                data: {
                    status: '0',
                    message: 'Area not found',
                },
            });
        }

        const area = docRef.data();

        res.json({
            data: {
                status: '1',
                message: 'Area fetched successfully',
                id: docRef.id,
                area,
            },
        });
    } catch (error) {
        console.error('Error fetching Area:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching area',
                error: error.message,
            },
        });
    }
};

/////Get all areas
const getAreas = async (req, res) => {
    try {
        // Fetch all documents in the "Areas" collection
        const docRef = await db.collection('Areas').get();

        const areas = docRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.json({
            data: {
                status: '1',
                message: 'Areas fetched successfully',
                areas,
            },
        });
    } catch (error) {
        console.error('Error fetching Areas:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching areas',
                error: error.message,
            },
        });
    }
};


//add area
const addArea = async (req, res) => {
    const { area_id, name, type, constituencyId, area_image, administrativeBodyId } = req.body;

    // Validate required fields
    if (!area_id || !name || !type || !constituencyId || !administrativeBodyId) {
        return res.status(400).json({
            data: {
                status: '0',
                message: 'All fields are required and must not be empty.',
            },
        });
    }

    try {
        // Create the new area object
        const newArea = {
            area_id,
            name,
            type,
            constituencyId,
            area_image: area_image || '', // Default to empty string if not provided
            createdAt: new Date(), // Auto-generate timestamp
            updatedAIT: new Date(), // Auto-generate timestamp
            administrativeBodyId,
        };

        // Add the document to the "Areas" collection
        const docRef = await db.collection('Areas').add(newArea);

        res.json({
            data: {
                status: '1',
                message: 'Area added successfully',
                id: docRef.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error adding area',
                error: error.message,
            },
        });
    }
};

module.exports = { getAreaById, getAreas, addArea };