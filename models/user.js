const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const user=sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ispremiumuser:DataTypes.BOOLEAN,
    totalExpense:{
       type:DataTypes.DOUBLE,
       defaultValue:0
    }
})

module.exports=user;