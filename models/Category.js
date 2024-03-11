const { sequelize, Sequelize } = require("./main");

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category',{
        categName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Category;
}