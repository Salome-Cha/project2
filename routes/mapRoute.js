const express = require('express');
const router  = express.Router();
const User = require('../models/User');

function requireLogin(req, res, next) {  // we create a middleware function, to pass it in the route.
  if (req.session.currentUser) {   // If this exists, means we are authenticated.
    next();
  } else {
    res.redirect('/login')
  }
}

// GET THE HELPER MAP
router.get('/h-map', (req, res) =>{
  console.log("test to check")
  User.find({userType: "needy"})
  .populate("needType")
  .then ((needyUsersFromDB) => {
    let needyUsersFromDBString = JSON.stringify(needyUsersFromDB);
    let userStr = JSON.stringify(req.session.currentUser);
    res.render('map/helper-map', {user: userStr, needyUsersFromDB: needyUsersFromDB, markers: needyUsersFromDBString});
  })

// map shall render also the object: helperNearby:
 
})




// GET THE NEEDY MAP
router.get('/n-map', (req, res) =>{

  const markers = [
    { lat: 38.7129146, lng: -9.1286218 },
    { lat: 38.7117206, lng: -9.1264315 },
    { lat: 38.7123872, lng: -9.1287935}
  ];
  let markersString = JSON.stringify(markers);

  // map shall render also the object: helperNearby:
  res.render('map/needy-map', {user: req.session.currentUser, markers: markersString});
})

module.exports = router;

