require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: process.env.SSL_REQUIRE === 'true',
                rejectUnauthorized: process.env.SSL_REJECT_UNAUTHORIZED === 'true',
                ca: fs.readFileSync(path.join(__dirname, './ca.pem')),
            },
        },
    }
);

const connectDb = async () => {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};

module.exports = {
    sequelize,
    connectDb,
};
