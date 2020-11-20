const express = require('express');
const router  = express.Router();
const User = require('../models/userModel');

function requireLogin(req, res, next) {  // we create a middleware function, to pass it in the route.
  if (req.session.currentUser) {   // If this exists, means we are authenticated.
    next();
  } else {
    res.redirect('/login')
  }
}

// GET THE HELPER MAP
router.get('/h-map', (req, res) =>{
  User.find({userType: "needy"})
  .populate("needType")
  .then ((needyUsersFromDB) => {
    let needyUsersFromDBString = JSON.stringify(needyUsersFromDB);
    let userStr = JSON.stringify(req.session.currentUser);
    console.log("userstr", userStr);
    res.render('map/helper-map', {user: userStr, needyUsersFromDB: needyUsersFromDB, markers: needyUsersFromDBString}); // map shall render also the object: helperNearby:
  })
  .catch((err) => console.log("Error:", err))    
})




// GET THE NEEDY MAP
router.get('/n-map', (req, res) =>{
  User.find({userType: "helper"})
  .populate("serviceType")
  .then ((helpersUsersFromDB) => {
    let helpersUsersFromDBString = JSON.stringify(helpersUsersFromDB);
    let userStr = JSON.stringify(req.session.currentUser);
    res.render('map/needy-map', {user: userStr, helpersUsersFromDB: helpersUsersFromDB, markers: helpersUsersFromDBString});
  })
 .catch((err) => console.log("Error:", err))    
})


module.exports = router;



 

