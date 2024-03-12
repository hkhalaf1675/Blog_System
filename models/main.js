const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize,Sequelize);
db.Post = require('./Post')(sequelize,Sequelize);
db.Category = require('./Category')(sequelize,Sequelize);
db.SavedPostsList = require('./SavedPostsList')(sequelize,Sequelize);
db.ListPosts = require('./ListPosts')(sequelize, Sequelize);

// relation between models
// -- relation between User{one} and Post{many}
db.User.hasMany(db.Post, {as: 'posts'});
db.Post.belongsTo(db.User);

// -- relation between Post{many} and Category{many}
db.Post.belongsToMany(db.Category, {through: 'PostCategories'});
db.Category.belongsToMany(db.Post, {through: 'PostCategories'});

// -- relation between User{One} and SavedPostsList{many}
db.User.hasMany(db.SavedPostsList, {as: 'savedPostsLists'});
db.SavedPostsList.belongsTo(db.User);

// -- relation between Post{many} and SavedPostsList{many}
db.Post.hasMany(db.ListPosts, {as: 'listPosts'});
db.ListPosts.belongsTo(db.Post);
db.SavedPostsList.hasMany(db.ListPosts, {as: 'listPosts'});
db.ListPosts.belongsTo(db.SavedPostsList);

module.exports = db;