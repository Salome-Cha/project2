const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');


router.get('/signup', (req, res) =>{
  res.render('auth/signup');
});


router.post('/signup', async (req, res) =>{
const {firstName, lastName, userName, email, address, city, postCode, password, country, helper, needy, helpType, needType, subServices} = req.body;
let color;
  if(helper) {
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
    HelpType.create({helpType, subServices, color})
    .then((res) => { 
      User.create({firstName, lastName, userName, photo, email, description, password, address, postCode, city, country, helper, subServices, serviceType: res._id});
    }).then ((res) => {
    console.log("A helper was created")
    res.redirect('/index')
  })
    .catch ((err) => console.log("An error occured while creating a helper:", err))
  } else {
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
    NeedType.create({needType, color})
      .then((res) => { 
        User.create({firstName, lastName, userName, photo, email, description, password, address, postCode, city, country, needy, needType: res._id})
      })
      .then ((res) => {
        console.log("A needer was created")
        res.redirect('/index');
      })
      .catch ((err) => console.log("An error occured while creating a needer:", err))
  }  
})


router.get('/login', (req, res) =>{
  res.render('auth/login');
});



module.exports = router;