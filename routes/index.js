const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');


// Require a middleware
function requireLogin(req, res, next) {  // we create a middleware function, to pass it in the route.
  if (req.session.currentUser) {   // If this exists, means we are authenticated.
    next();
  } else {
    res.redirect('/login')
  }
}


/* GET home page */
router.get('/', (req, res, next) => {
  // req.app.locals.loggedUser = req.session.currentUser; //--> to show on the views we must set it to req.app.locals ... so it exports..
  let url = req.url;
  res.render('main/homepage', {url: url, user: req.session.currentUser});
});

router.get('/signup', (req, res) =>{
  res.render('auth/signup');
});

router.get('/services', (req, res) =>{
  res.render('main/offer');
})
router.get('/help-hub', (req, res) =>{
  res.render('main/help-hub');
})
router.get('/about', (req, res) =>{
  res.render('main/aboutUs');
});
router.get('/faq', (req, res) =>{
  res.render('main/faq');
});
router.get('/contacts', (req, res) =>{
  res.render('main/contacts');
});

module.exports = router;
