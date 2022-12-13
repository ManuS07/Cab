const {Sequelize} = require('sequelize')

const sequelize = new Sequelize("myride", "root", "rootpassword", {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;