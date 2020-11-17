const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');


router.get('/signup', (req, res) =>{
  res.render('auth/signup');
});


router.post('/signup', (req, res) =>{
  let {firstName, lastName, userName, email, address, city, postCode, password, country, userType, needy, helpType, needType, subServices} = req.body;
  let color;
  console.log('helper', userType);
  if(userType === 'Provide help') {
    helper = true,
    needy = false
  } 

  if(userType) {
    switch (helpType) {
      case "food": 
       color = "turchese";
       break;
      case "hosting": 
       color = "blue";
       break;
      case "administrative": 
       color = "peach";
       break;
       case "healthcare": 
       color = "navy";
       break;
    }
    console.log('helptype', helpType);
    HelpType.create({name: helpType, subServices, color})
    .then((response) => { 
      console.log('username', userName);
      User.create({firstName, lastName, userName, email, password, address, postCode, city, country, helper, subServices, serviceType: response._id});
    }).then ((response) => {
    console.log("A helper was created")
    res.redirect('/')
  })
    .catch ((err) => console.log("An error occured while creating a helper:", err))
  } else {
    if(userType === 'Be helped') {
      helper = false,
      needy = true
    }
      switch (needType) {
        case "food": 
         color = "turchese";
         break;
        case "hosting": 
         color = "blue";
         break;
        case "administrative": 
         color = "peach";
         break;
         case "healthcare": 
         color = "navy";
         break;
      }
 
      NeedType.create({name: needType, needy:true, helper:false, color})
      .then((response) => { 
        User.create({firstName, lastName, userName, email, password, address, postCode, city, country, needy, needType: response._id})
      })
      .then ((response) => {
        console.log("A needer was created")
        res.redirect('/');
      })
      .catch ((err) => console.log("An error occured while creating a needer:", err))
  }  
})


router.get('/login', (req, res) =>{
  res.render('auth/login');
});



module.exports = router;