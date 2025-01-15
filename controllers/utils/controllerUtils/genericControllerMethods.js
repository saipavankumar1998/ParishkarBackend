/**
 * Generic method to update a document (partial updates)
 * @param {string} collectionName - Firestore collection name
 * @param {string} docId - Document ID
 * @param {object} updates - Fields to update
 * @returns {object} - Result of the operation
 */
const updateDocument = async (collectionName, docId, updates) => {
    try {
        // Reference to the document
        const docRef = db.collection(collectionName).doc(docId);

        // Fetch the document to check if it exists
        const doc = await docRef.get();

        if (!doc.exists) {
            // Document not found
            return { status: '0', message: `${collectionName} document with ID "${docId}" not found` };
        }

        // Update the document with the provided fields
        await docRef.update(updates);

        return { status: '1', message: `${collectionName} document with ID "${docId}" updated successfully` };
    } catch (error) {
        // Handle Firestore update errors
        throw {
            status: '0',
            message: `Error updating document in ${collectionName}`,
            error: error.message,
        };
    }
};


/**
 * Generic update handler for partial updates
 * @param {string} collectionName - Firestore collection name
 * @returns {function} - Express middleware for handling updates
 */
const updateHandler = (collectionName) => {
    return async (req, res) => {
        try {
            const result = await updateDocument(collectionName, req.params.id, req.body);

            // If document not found, return 404
            if (result.status === '0') {
                return res.status(404).json({ data: result });
            }

            // Return success response
            res.json({ data: result });
        } catch (error) {
            // Handle unexpected errors during the update
            res.status(500).json({
                data: {
                    status: '0',
                    message: `Error updating document in ${collectionName}`,
                    error: error.message,
                },
            });
        }
    };
};

/**
 * Generic method to delete a document by ID
 * @param {string} collectionName - Firestore collection name
 * @param {string} docId - Document ID
 * @returns {object} - Result of the operation
 */
const deleteDocument = async (collectionName, docId) => {
    try {
        // Reference the document
        const docRef = db.collection(collectionName).doc(docId);

        // Fetch the document to ensure it exists
        const doc = await docRef.get();
        if (!doc.exists) {
            // Document not found
            return { status: '0', message: `${collectionName} document with ID "${docId}" not found` };
        }

        // Delete the document
        await docRef.delete();

        return { status: '1', message: `${collectionName} document with ID "${docId}" deleted successfully` };
    } catch (error) {
        // Handle errors during the delete operation
        throw {
            status: '0',
            message: `Error deleting document in ${collectionName}`,
            error: error.message,
        };
    }
};

/**
 * Generic delete handler for removing a document
 * @param {string} collectionName - Firestore collection name
 * @returns {function} - Express middleware for handling deletes
 */
const deleteHandler = (collectionName) => {
    return async (req, res) => {
        try {
            // Call the deleteDocument method with the collection name and document ID
            const result = await deleteDocument(collectionName, req.params.id);

            // If document not found, return 404
            if (result.status === '0') {
                return res.status(404).json({ data: result });
            }

            // Return success response
            res.json({ data: result });
        } catch (error) {
            // Handle unexpected errors
            res.status(500).json({
                data: {
                    status: '0',
                    message: `Error deleting document in ${collectionName}`,
                    error: error.message,
                },
            });
        }
    };
};

export default { updateHandler, deleteHandler };