const express = require('express');

const router = express.Router();

const controller = require('../Controllers/controllers');
//get requests 
router.get('/addproperty', controller.getAddProperty);
router.get('/hotelmenu', controller.getHotelMenu);
router.get('/ameniti_img', controller.getAmenitiImages);
router.get('/destination_master', controller.GetDestinationMaster);
router.get('/awt_master', controller.GetAwtMaster);
router.get('/current_deal', controller.GetCurrentDeal);
router.get('/listing', controller.GetListing);
router.get('/citylist', controller.GetCityList);
router.get('/getdefault', controller.GetDefaultPrice);
router.get('/listingNew',controller.GetListingNew);
// router.get('/searchlisting/:city/:adults/:children/:room/:fromdate/:todate', controller.GetSearchListing);
//post requests 
router.post('/gallary', controller.getGallery);
router.post('/staybindass', controller.PostStayBindass);
router.post('/awt_registeruser', controller.PostRegisterUser);
router.post('/awt_registeruser_update', controller.PostUpdateRegisteredUser);
router.post('/property_enquiry', controller.PostPropertyEnquiry);
router.post('/change_pass',controller.UpdatePassword);
router.post('/confirm_booking', controller.ConfirmBooking);
router.post('/get_wish', controller.PostGetWish);
router.post('/Booking_page', controller.PostBookingPage);
router.post('/payment_page', controller.PostPaymentPage);
router.post('/search_comp', controller.PostSearchComp);
router.post('/wishlist',controller.PostWishList);
router.post('/wish_delete', controller.PostWishDelete);
router.post('/wish_get',controller.PostWishGet);
router.post('/count', controller.PostCount);
router.post('/contact', controller.PostContact);
router.post('/wish_data', controller.GetWishData);

module.exports = router;