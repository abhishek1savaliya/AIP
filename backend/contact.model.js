const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Contact = sequelize.define('Contact', {
    id: {
        type: DataTypes.UUID,         
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,            
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

const syncDatabase = async () => {
    try {
        await Contact.sync()
        console.log('Contact model synced with the database.')
    } catch (error) {
        console.error('Error syncing Contact model:', error)
    }
};

syncDatabase();

module.exports = Contact;
