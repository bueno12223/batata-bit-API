require('dotenv').config();

const config = {
    dbPassword:process.env.DB_PASSWORD,
    dbUser:process.env.DB_USER,
    dbname: process.env.DB_NAME,
    defaultUserPassword:process.env.DEFAULT_USER_PASSWORD,
    defaultAdminPassword:process.env.DEFAULT_ADMIN_PASSWORD,
    UserKey:process.env.USER_KEY,
    AdminKey:process.env.ADMIN_KEY
};
module.exports = {config};