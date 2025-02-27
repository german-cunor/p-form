const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Question = sequelize.define("Question", {
    text: { type: DataTypes.STRING, allowNull: false }
});

const Choice = sequelize.define("Choice", {
    text: { type: DataTypes.STRING, allowNull: false }
});

Question.hasMany(Choice);
Choice.belongsTo(Question);

module.exports = { sequelize, Question, Choice };
