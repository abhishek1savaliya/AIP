const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Donation = sequelize.define('Donation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
}, {
    timestamps: true,
});

const syncDatabase = async () => {
    try {
        await Donation.sync();
        console.log('Donation model synced with the database.');
    } catch (error) {
        console.error('Error syncing Donation model:', error);
    }
};

syncDatabase();

module.exports = Donation;
