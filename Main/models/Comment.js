const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model {};

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,500],
            },
        },
        date_created: {
            type: DataTypes.DATE,
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
        blog_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'blog',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;
