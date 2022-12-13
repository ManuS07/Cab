const {Sequelize,DataTypes} = require('sequelize');
const db = require('./db');

const SignUp = db.define('SignUp',{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
  
     },
     
      first_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
      },
      last_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
      },
      mobile_no:{
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true       
      },
      password: {
          type: DataTypes.STRING(50),
          allowNull: false
         
      },
      role:{
        type: DataTypes.STRING(50),
        allowNull:false
    }

  
  });
module.exports = SignUp;