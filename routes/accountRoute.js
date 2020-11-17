const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');


//---------- RENDER THE PROFILE FROM THE CONTENT OF THE DATABASE-------------

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


router.get('/n-profile', (req, res) =>{
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