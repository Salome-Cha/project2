const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');
const axios = require('axios');
const session = require('express-session')

//---------- SIGN UP -------------



router.post('/signup', (req, res) =>{
  let {firstName, lastName, userName, email, address, city, postCode, password, country, userType, helpType, needType, subServices} = req.body;
  let color;
  let geocoding;

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}+${address}+${city}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
  .then((responsegeo) => {
  geocoding = responsegeo.data.results[0].geometry.location;
  
  })
  .then(() => {
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
            console.log(response)
            let helpId = response[0]._id;
            return User.create({firstName, lastName, userName, email, userType, password: hashPassword, address, postCode, city, country, geocoding, serviceType: helpId});
          }).then ((user) => {
          console.log("A helper was created")
          req.session.currentUser = user;
          res.redirect('/') // need to pass the user when we change for the map {user: req.session.currentUser}
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
          return User.create({firstName, lastName, userName, email, password: hashPassword, address, postCode, city, country, geocoding, userType, needType: needId})
        })
        .then ((user) => {
          console.log("A needer was created")
          req.session.currentUser = user;
          req.app.locals.loggedUser = req.session.currentUser;
          res.redirect('/h-map');  // need to pass the user when we change for the map {user: req.session.currentUser}
        })
        .catch ((err) => console.log("An error occured while creating a needer:", err))
    }

  })

   
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
        req.app.locals.loggedUser = req.session.currentUser;
        // console.log("currentuser", req.session.currentUser);
        res.redirect('/h-map')
      } else {
        //pass dont match
        res.render('auth/login', {errorMessage: 'Invalid Login Password'});
      }
    })
});


// LOGOUT
router.post('/logout', (req, res) =>{
  req.session.destroy();
  req.app.locals.loggedUser = null;
  res.redirect('/');
})


module.exports = router;