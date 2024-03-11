const {Sequelize, sequelize} = require('./main');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User',{
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 8
            }
        },
        isAuthor: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return User;
}