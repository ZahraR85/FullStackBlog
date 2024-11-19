import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js'; // Database connection

const Post = sequelize.define(
    'posts',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Automatically set to the current date
        },
    },
    {
        tableName: 'posts', // Explicitly specify the table name
        timestamps: false, // Disable createdAt/updatedAt
    }
);
//Post.sync();
//Post.sync({force: true});
//Post.sync({alter: true});
export default Post;