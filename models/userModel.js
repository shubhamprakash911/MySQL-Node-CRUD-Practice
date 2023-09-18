const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

console.log("user");

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["user", "admin", "seller"],
    defaultValue: "user",
  },
});

module.exports = User;
