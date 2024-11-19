import sequelize from './config.js'; // Database connection
import Post from '../models/Post.js'; // Import the Post model

const db = {
    sequelize,
    Post,
};

// Optional: Sync database only during development or for testing
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
        // Uncomment the next line to sync models to the database
        // await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
})();

export default db;
