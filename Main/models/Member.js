const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Member extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
};

Member.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                len: [1, 50],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [8],
            },
        },
    },
    {
        hooks: {
            async beforeCreate(newMember){
                newMember.password = await bcrypt.hash(newMember.password, 10);
                return newMember;
            },
            async beforeUpdate(updateMember){
                updateMember.password = await bcrypt.hash(updateMember.password, 10);
                return updateMember;
            },
        },
        sequelize,
        timestamp: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'member',
    }
);

module.exports = Member;