const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const orders=sequelize.define('orders',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    paymentid:DataTypes.STRING,
    orderid:DataTypes.STRING,
    status:DataTypes.STRING
})

module.exports=orders;