const Cab = require('../model/cab');
const auth=require('../middlewares/authenticationMiddleware')
const {body, validationResult} = require('express-validator');

module.exports.cabs = (req, res, next) => {
    res.render('cab');
}
module.exports.cabPost = (req, res, next) => {
    Cab.create({
        SignUpUserId:req.session.userId,
        cab_no : req.body.cab_no,
        cab_name : req.body.cab_name,
        cab_type : req.body.cab_type,
        cab_capacity : req.body.cab_capacity,
        

    })
        .then(cabFromDb => {
            res.redirect("/driverprofile");
        })

}
module.exports.cabIndex = (req, res, next) => {
    Cab.findAll().then(details => {
        res.render('cab-index', {
            data: details,

        });
    });
}
module.exports.cabUpdate = async (req, res, next) => {
    Cab.findByPk(req.params.id)
        .then(infoFromDb => {
            res.render('cab-update', {
                data: infoFromDb
            });
        });
}
module.exports.cabUpdatePost = async (req, res, next) => {

    await Cab.update(
        {
            cab_no : req.body.cab_no,
            cab_name : req.body.cab_name,
            cab_type : req.body.cab_type,
            cab_capacity : req.body.cab_capacity
        
        },
        
        {
            where: { cab_id: req.params.id }
        }
    )
    res.redirect('/cabindex');
}
module.exports.remove = async (req, res, next) => {
    let id = req.params.id;
    let infoFromDb = await Cab.findByPk(id);
    if (infoFromDb != null) {
        await Cab.destroy({
            where: {
                cab_id: id
            }
        });
        res.redirect("/cabindex");
    }
}
module.exports.cab_select = (req, res, next) => {
    let id = req.session.userId;
    Cab.findAll()
    .then((data) => {
        res.render('cab-select',  
        {
            data:data,
            identity: req.identity.user
        
        });

    })
}
