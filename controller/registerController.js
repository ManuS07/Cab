const Signup = require('../model/signup');
const Cab = require('../model/cab');
const sequelize = require('../model/db');
const auth=require('../middlewares/authenticationMiddleware')
const {body, validationResult} = require('express-validator');
const { request } = require('express');


module.exports.home = (req, res, next) => {
    res.render('home');
}

module.exports.login = (req, res, next) => {
    res.render('login');
}


    module.exports.loginPost = async (req, res, next) => {
        const { email, password } = req.body;
        const userFromDb = await Signup.findOne({
            where: { email: email, password: password }
            
        })
        
        if (userFromDb == null) {
            
            return res.render('login', { message: 'No user with this email or password was found.' })
        }
        else if (userFromDb.role == 'Driver') {
           
            req.session.userId = userFromDb.dataValues.user_id;
            Cab.findOne({where:{
                SignUpUserId: req.session.userId}})
            .then((data)=>{
               
                if(data == null){
                    res.redirect('/cabs');

                }
                else{
                    res.redirect('/driverprofile');
                }
            })
            

        }
        else if (userFromDb.role == 'Passenger'){
            req.session.userId = userFromDb.dataValues.user_id;
           res.redirect('/passengerprofile');
        }
        else if (userFromDb.role == 'Admin'){
            req.session.userId = userFromDb.dataValues.user_id;
            res.redirect('/mode');
        }
   
       
        
    
    }
        
    
    module.exports.logOut= (req, res, next)=>{
        req.session=null 
        res.redirect("/home")
    }

module.exports.index = (req, res, next) => {
    Signup.findAll().then(details => {
        res.render('sign-index', {
            data: details,

        });
    })
}

module.exports.create = (req, res, next) => {
    res.render('sign-create');
}

module.exports.createPost = (req, res, next) => {
    Signup.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        password: req.body.password,
        role: req.body.role



    })
        .then(infoFromDb => {
            res.redirect("/login");
        })
}

module.exports.update = async (req, res, next) => {
    Signup.findByPk(req.params.id)
        .then(infoFromDb => {
            res.render('sign-update', {
                data: infoFromDb
            });
        });
}


module.exports.passengerupdatePost = async (req, res, next) => {

    await Signup.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            password: req.body.password,
            role: req.body.role
        
        },

        {
            where: { user_id: req.params.id }
        }
    )
    res.redirect('/passengerprofile');
}
module.exports.driverupdatePost = async (req, res, next) => {

    await Signup.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            password: req.body.password,
            role: req.body.role
        
        },

        {
            where: { user_id: req.params.id }
        }
    )
    res.redirect('/driverprofile');
}
module.exports.delete = async (req, res, next) => {
    let id = req.params.id;
    let infoFromDb = await Signup.findByPk(id);
    if (infoFromDb != null) {
        await Signup.destroy({
            where: {
                user_id: id
            }
        });
        res.redirect("/home");
    }
}


module.exports.passengerProfile = (req, res, next) => {
    let id = req.session.userId;
    Signup.findAll({where: {user_id: id}})
    .then((data) => {
        res.render('passengerprofile', 
        {
            data:data,
            identity: req.identity.user
        
        });

    })
}
module.exports.driverProfile = (req, res, next) => {
    let id = req.session.userId;
    Signup.findAll({where: {user_id: id}})
    .then((data) => {
        res.render('driverprofile', 
        {
            data:data,
            identity: req.identity.user
        
        });

    })
}
module.exports.userBooking=(req,res,next)=> {
    sequelize.query('SELECT * FROM myride.books inner join myride.signups on signups.user_id=books.driver_id and books.SignUpUserId=?',
    {replacements:[req.session.userId]}).then((data)=>{
       
       
        data = data.pop()
        res.render('user-bookings',{
            data:data
        })
    })
}

