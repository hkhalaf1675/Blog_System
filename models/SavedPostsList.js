const {Sequelize,sequelize} = require('./main');

module.exports = (sequelize,Sequelize) => {
    const SavedPostsList = sequelize.define('SavedPostsList',{
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return SavedPostsList;
}