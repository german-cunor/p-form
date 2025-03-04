const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Section = sequelize.define("Section", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "sections",
    timestamps: false
});

module.exports = Section;
