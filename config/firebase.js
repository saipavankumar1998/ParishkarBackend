const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-service-account-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Initialize Firestore

const testFirestore = async () => {
    try {
        const testDoc = await db.collection('connectivityTest').doc('pingDoc').get();

        if (testDoc.exists) {
            console.log('Firestore is connected! Ping document verified.');
        } else {
            console.error('Ping document not found. Firestore is connected, but setup may be incomplete.');
        }
    } catch (error) {
        console.error('Firestore connectivity test failed:', error.message);
    }
};

testFirestore();

// Export Firebase services
module.exports = { admin, db };


