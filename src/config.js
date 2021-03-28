require('dotenv').config();

const config = {
    dbPassword:process.env.DB_PASSWORD,
    dbUser:process.env.DB_USER,
};
module.exports = {config};