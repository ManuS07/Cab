const Book = require('../model/book');
const sequelize = require('../model/db');
const auth=require('../middlewares/authenticationMiddleware')
const {body, validationResult} = require('express-validator');

module.exports.book = (req, res, next) => {
    res.render('book');
}
module.exports.mode = (req, res, next) => {
    res.render('mode');
}

module.exports.bookIndex = (req, res, next) => {
    Book.findAll().then(detail => {
        res.render('book-index', {
            data: detail

        });
    })
}
module.exports.bookPost = (req, res, next) => {
    Book.create({
        driver_id: req.params.id,
        SignUpUserId:req.session.userId,
        pick_up:req.body.pick_up,
        destination:req.body.destination,
        cab_type:req.body.cab_type,
        date: req.body.date,
        time: req.body.time


    })
        .then(infoFromDb => {
            res.redirect("/payment");
        })
}
module.exports.bookUpdate = async (req, res, next) => {
    Book.findByPk(req.params.id)
        .then(infoFromDb => {
            res.render('book-update', {
                data: infoFromDb
            });
        });
}


module.exports.bookUpdatePost = async (req, res, next) => {

    await Book.update(
        {
            pick_up:req.body.pick_up,
            destination:req.body.destination,
            date: req.body.date,
            time: req.body.time
        
        },
        
        {
            where: { booking_id: req.params.id }
        }
    )
    res.redirect('/index');
}
module.exports.cancel = async (req, res, next) => {
    let id = req.params.id;
    let infoFromDb = await Book.findByPk(id);
    if (infoFromDb != null) {
        await Book.destroy({
            where: {
                booking_id: id
            }
        });
        res.redirect("/index");
    }
}
module.exports.payment=(req,res,next)=>{

            res.render('pay');
        
}
module.exports.paymentPost=(req,res,next)=>{

    res.render('Payment');

}


module.exports.singleBook = (req, res, next) => {
    let id = req.session.userId;
    Book.findAll({where: {SignUpUserId : id}})
    .then((data) => {
        res.render('book-index', 
        {
            data:data,
            identity: req.identity.user
        
        });

    })
}

module.exports.booking=(req,res,next)=> {
    
    sequelize.query('SELECT * FROM myride.books inner join myride.signups on signups.user_id=books.SignUpUserId and books.driver_id=?',
    {replacements:[req.session.userId]}).then((data)=>{
       
       
        data = data.pop()
        res.render('bookings',{
            data:data
        })
    })
}
module.exports.download = (req, res, next) => {
    let id = req.session.userId;
    Book.findAll({where: {booking_id: id}})
    .then((data) => {
        res.render('download', 
        {
            data:data,
           
        
        });

    })
}


