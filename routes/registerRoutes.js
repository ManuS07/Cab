const express = require('express');
const controller = require('../controller/registerController');
const controller1 = require('../controller/bookController');
const controller2 = require('../controller/cabController');

const router = express.Router();

router.get('/home', controller.home);
router.get('/cab', controller.index);
router.get('/login', controller.login);
router.post('/login', controller.loginPost);
router.get('/create', controller.create);
router.post('/create', controller.createPost);
router.get('/passengerupdate/:id', controller.update);
router.post('/passengerupdate/:id', controller.passengerupdatePost);
router.get('/driverupdate/:id', controller.update);
router.post('/driverupdate/:id', controller.driverupdatePost);
router.get('/delete/:id', controller.delete);
router.get('/logout', controller.logOut);
router.get('/userbooking', controller.userBooking);


router.get('/mode', controller1.mode);
router.get('/change/:id', controller1.bookUpdate);
router.post('/change/:id', controller1.bookUpdatePost);
router.get('/index', controller1.bookIndex);
router.get('/cancel/:id', controller1.cancel);
router.get('/book/:id', controller1.book);
router.post('/book/:id', controller1.bookPost);
router.get('/showbook', controller1.booking);
router.get('/singlebooking', controller1.singleBook);
router.get('/download', controller1.download);

router.get('/cabs',controller2.cabs);
router.post('/cabs',controller2.cabPost);
router.get('/cabindex',controller2.cabIndex);
router.get('/cabselect',controller2.cab_select);
router.get('/alter/:id',controller2.cabUpdate);
router.post('/alter/:id',controller2.cabUpdatePost);
router.get('/remove/:id',controller2.remove);

router.get('/payment',controller1.payment)
router.post('/payment',controller1.paymentPost)
router.get('/passengerprofile',controller.passengerProfile);
router.get('/driverprofile',controller.driverProfile);

module.exports = router;