const {sequelize,Sequelize} = require('./main');

module.exports = (sequelize, Sequelize) => {
    const ListPosts = sequelize.define('ListPosts');

    return ListPosts;
}