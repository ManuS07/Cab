const {Sequelize,DataTypes} = require('sequelize');
const db1 = require('./db');
const SignUp = require('./signup');

const Book = db1.define('Book',{
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
  
     },
      driver_id: {
      type: DataTypes.INTEGER,
      onDelete: "cascade",
      references:{
         model: "signups",
         key: "user_id"
      }
     

   },
   
    
     pick_up:{
        type:DataTypes.STRING(50),
        allowNull:false
    
     },
     destination:{
        type:DataTypes.STRING(50),
        allowNull:false
     },
     date:{
        type: DataTypes.DATEONLY,
        allowNull:false
     },
     time:{
        type: DataTypes.TIME,
        allowNull:false
     }

    
  });
  SignUp.hasMany(Book)
  Book.belongsTo(SignUp)
module.exports = Book;
