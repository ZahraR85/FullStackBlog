import sequelize from './config.js'; // Database connection
import Post from '../models/Post.js'; // Import the Post model

const db = {sequelize,Post};

export default db;
