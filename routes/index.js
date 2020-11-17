const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');

// function requireLogin(req, res, next) {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// }


/* GET home page */
router.get('/', (req, res, next) => {
  // req.app.locals.loggedUser = req.session.currentUser; //--> to show on the views we must set it to req.app.locals ... so it exports..
  let url = req.url;
  res.render('main/homepage', {url}, /* {user: req.session.currentUser} */);
});

router.get('/services', (req, res) =>{
  res.render('main/offer');
})
router.get('/blog', (req, res) =>{
  res.render('main/blog');
})

module.exports = router;
