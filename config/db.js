const { Sequelize } = require("sequelize");

// Define your database configuration
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
