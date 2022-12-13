const {Sequelize,DataTypes} = require('sequelize');
const db2 = require('./db');
const SignUp = require('./signup');

const Cab = db2.define('Cab',{
    cab_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
  
     },
   
     cab_no:{
        type:DataTypes.STRING(50),
        unique: true,
        allowNull:false
    
     },
     cab_name:{
        type:DataTypes.STRING(50),
        allowNull:false
     },
    cab_type:{
        type: DataTypes.STRING(50),
        allowNull:false
     },
     cab_capacity:{
        type: DataTypes.INTEGER,
        allowNull:false
     },
   
  

    
  });
  
  SignUp.hasMany(Cab)
  Cab.belongsTo(SignUp)
  
module.exports = Cab;
