const { db } = require('../config/firebase');

// Fetch body by Admistratice body Id
const getAdministrativeBodyById = async (req, res) => {
    try {
        console.log('Administrative Body ID:', req.params.id);
        
        // Fetch the document
        const docRef = await db.collection('administrativeBodies').doc(req.params.id).get();

        if (!docRef.exists) {
            return res.status(404).json({
                data: {
                    status: '0',
                    message: 'Administrative Body not found'
                }
            });
        }

        const administrativeBody = docRef.data();

        res.json({
            data: {
                status: '1',
                message: 'Administrative Body fetched successfully',
                id: docRef.id,
                administrativeBody
            }
        });
    } catch (error) {
        console.error('Error fetching Administrative Body:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching Administrative Body',
                error: error.message
            }
        });
    }
};


// Fetch all  Administrative bodies
const getAdministrativeBodies = async (req, res) => {
    try {
        // Fetch all documents in the collection
        const docRef = await db.collection('administrativeBodies').get();

        const administrativeBodies = docRef.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json({
            data: {
                status: '1',
                message: 'Administrative Bodies fetched successfully',
                administrativeBodies
            }
        });
    } catch (error) {
        console.error('Error fetching Administrative Bodies:', error);
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error fetching Administrative Bodies',
                error: error.message
            }
        });
    }
};


const addAdministrativeBody = async (req, res) => {
    const { type, name, constituencyId, employees, areas, administrativeBodyId } = req.body;

    // Validate that all required fields are present and non-empty
    if (!type || !name || !constituencyId || !Array.isArray(areas) || !Array.isArray(employees) || !administrativeBodyId) {
        return res.status(400).json({
            data: {
                status: '0',
                message: 'All fields are required and must not be empty.',
            },
        });
    }

    try {
        // Create the new administrative body object
        const newBody = {
            type,
            name,
            constituencyId,
            areas,
            employees,
            administrativeBodyId,
        };

        // Add the document to the "administrativeBodies" collection
        const docRef = await db.collection('administrativeBodies').add(newBody);

        res.json({
            data: {
                status: '1',
                message: 'Administrative Body added successfully',
                id: docRef.id,
            },
        });
    } catch (error) {
        res.status(500).json({
            data: {
                status: '0',
                message: 'Error adding administrative body',
                error: error.message,
            },
        });
    }
};

module.exports = { getAdministrativeBodyById, getAdministrativeBodies, addAdministrativeBody };
