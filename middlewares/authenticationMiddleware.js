const { request } = require('express');
const db = require('../model/signup');

module.exports = async (req, res, next) => {
    req.identity = {
        isAuthenticated: false,
        db: null    
    }
    if(req.url == "/login" || req.url == "/create" || req.url=="/home"){
        return next();
    }
     
    let userId = req.session.userId;
   
    if(!userId || userId == null){
        return res.redirect("/login");
    }

    let userFromDb = await db.findByPk(userId);
   
    if(userFromDb == null){
        return res.redirect("/login");
    }
    

    req.identity.isAuthenticated = true;
    req.identity.db = {
        user_id: userFromDb.dataValues.user_id,
        role: 'user'
    }
   
    
    next();

}