const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const forgotPassword=sequelize.define('forgotPassword',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    },
})
module.exports=forgotPassword;