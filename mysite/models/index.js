const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    'webdb', 'webdb', 'webdb', {
        host: '192.168.80.103',
        port: 3307,
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize);

User.sync({
    force: false,
    alter: true
});

module.exports = { User }