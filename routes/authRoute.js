const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');


//---------- SIGN UP -------------

router.get('/signup', (req, res) =>{
  res.render('auth/signup');
});

router.post('/signup', (req, res) =>{
  let {firstName, lastName, userName, email, address, city, postCode, password, country, userType, helpType, needType, subServices} = req.body;
  let color;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log('helper', userType);
  if(userType === 'Provide help') {
    userType = 'helper';
  } else {
    userType = 'needy';
  }
  if(userType === 'helper') {
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

    //HelpType.findOne({name: userType, subServices})

        HelpType.find({name: helpType, subServices: subServices}) // subst when created
        .then((response) => { 
          let helpId = response[0]._id;
          User.create({firstName, lastName, userName, email, userType, password: hashPassword, address, postCode, city, country, serviceType: helpId});
        }).then ((user) => {
        console.log("A helper was created")
        res.redirect('/')
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
 
      NeedType.find({name: needType })
      .then((response) => { 
        let needId = response[0]._id
        User.create({firstName, lastName, userName, email, password: hashPassword, address, postCode, city, country, userType, needType: needId})
      })
      .then ((response) => {
        console.log("A needer was created")
        res.redirect('/');
      })
      .catch ((err) => console.log("An error occured while creating a needer:", err))
  }  
})


// ---------- LOG IN ----------------
router.get('/login', (req, res) =>{
  res.render('auth/login');
});
router.post('/login', (req, res) => {
  const {userName, password} = req.body;

  if(!userName || !password) {
    res.render('auth/login', {errorMessage: 'Please enter username and password'});
    return;
  }
  User.findOne({'userName': userName})
    .then((user) =>{
      if(!user) {
        res.render('auth/login', {errorMessage: 'Invalid Login Username'})
        return;
      } 
      if(bcrypt.compareSync(password, user.password)) {
        //login sucess
        req.session.currentUser = user;
        res.redirect('/');
        res.render('index', {user})
      } else {
        //pass dont match
        res.render('auth/login', {errorMessage: 'Invalid Login Password'});
      }
    })
});

router.post('/logout', (req, res) =>{
  req.session.destroy();
  res.redirect('/');
})



module.exports = router;