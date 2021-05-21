require('dotenv').config();

const config = {
    dbPassword:process.env.DB_PASSWORD,
    dbUser:process.env.DB_USER,
    dbname: process.env.DB_NAME,
    port: process.env.PORT,
};
module.exports = config;