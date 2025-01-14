const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./config/firebase');

//Routes
const userRoutes = require('./routes/userRoutes');
const employeesRoutes = require('./routes/employeesRoutes');
const issuesRoutes = require('./routes/issuesRoutes');
const departmentsRoutes = require('./routes/departmentsRoutes');
const constituenciesRoutes = require('./routes/constituenciesRoutes');
const administrativeBodiesRoutes = require('./routes/administrativeBodiesRoutes');
const areasRoutes = require('./routes/areasRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Test Firebase Connection
app.get('/test-firebase', async (req, res) => {
    try {
        const collections = await db.listCollections();
        const collectionNames = collections.map(col => col.id);
        console.log('Firestore Collections:', collectionNames);

        res.json({ message: 'Connected to Firebase!', collections: collectionNames });
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Failed to connect to Firebase', error: error.message });
    }
});


//Routes binding
app.use('/users', userRoutes);
app.use('/employees', employeesRoutes);
app.use('/issues', issuesRoutes);
app.use('/departments', departmentsRoutes);
app.use('/constituencies', constituenciesRoutes);
app.use('/administrativeBodies', administrativeBodiesRoutes);
app.use('/areas', areasRoutes);

// Starts the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
