const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,
        underscored: true
    }
}

