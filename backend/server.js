import express from 'express';
import cors from 'cors';
import db from './db/index.js'; // Database and models
import postRouter from './routers/postRouter.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/', postRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Test database connection
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
})();

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
