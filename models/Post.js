const { Sequelize, sequelize } = require("./main");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        summary: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        postStatus: {
            type: Sequelize.ENUM('draft', 'published', 'unpublished'),
            allowNull: false,
        },
        coverImageUrl: {
            type: Sequelize.STRING
        }
    });

    return Post;
}
