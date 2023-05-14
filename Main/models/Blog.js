const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Blog extends Model {};

Member.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,300],
            },
        },
        body: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
        date_created: {
            type: dataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        member_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'member',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;
