const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');
const session = require('express-session')


//---------- RENDER THE PROFILE FROM THE CONTENT OF THE DATABASE-------------

function requireLogin(req, res, next) {  // we create a middleware function, to pass it in the route.
  if (req.session.currentUser) {   // If this exists, means we are authenticated.
    next();
  } else {
    res.redirect('/login')
  }
}


// create a private route for users logged to see the account.

router.get('/h-profile/:userId', (req, res) =>{
  let userId = req.params.userId;
  User.findById(userId)
  .populate('serviceType')
  .then((thisUser) => {
    res.render('main/helper-profile', {user: thisUser})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
})


router.get('/n-profile/:userId', (req, res) =>{
  let userId = req.params.userId;
  User.findById(userId)
  .populate('inNeedType')
  .then((thisUser) => {
    res.render('main/needy-profile', {user: thisUser})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
});

//---------- EDIT THE PROFILE -------------



module.exports = router;