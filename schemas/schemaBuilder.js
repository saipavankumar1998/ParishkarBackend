const { db } = require('../config/firebase');

const identifySchema = async () => {
    try {
        const collections = await db.listCollections();

        for (const collection of collections) {
            console.log('--------------------------------------------')
            console.log(`Analyzing collection: ${collection.id}`);
            console.log('--------------------------------------------')

            const snapshot = await collection.get();
            snapshot.forEach(doc => {
                console.log(`Document ID: ${doc.id}`);
                console.log('Fields:', doc.data());
            });
        }
    } catch (error) {

        console.error('Error identifying schema:', error);
    }
};

identifySchema()