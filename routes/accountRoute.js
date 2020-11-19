const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');
const NeedType = require('../models/NeedType');
const HelpType = require('../models/HelpType');
const session = require('express-session')
const fileUpload = require('../configs/cloudinary');

//---------- RENDER THE PROFILE FROM THE CONTENT OF THE DATABASE-------------

function requireLogin(req, res, next) {  // we create a middleware function, to pass it in the route.
  if (req.session.currentUser) {   // If this exists, means we are authenticated.
    next();
  } else {
    res.redirect('/login')
  }
}

// MY PROFILE HELPER
// create a private route for users logged to see their account.
router.get('/my-h-profile/:myUserId', (req, res) =>{
  let myUserId = req.params.myUserId;

  User.findById(myUserId)
  .populate('serviceType')
  .then((me) => {
    res.render('main/helper-profile', {user: me})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
})



// MY PROFILE NEEDY
router.get('/my-n-profile/:myUserId', (req, res) =>{
  let myUserId = req.params.myUserId;
  console.log('my id is', myUserId)
  User.findById(myUserId)
  .populate('needType')
  .then((me) => {
    res.render('main/needy-profile', {user: me})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
})

//---------- EDIT THE PROFILE -------------

router.get('/my-n-profile/:myId/edit', (req, res) => {
  let myEditingId = req.params.myId;
  User.findById(myEditingId)
    .populate('inNeedType')
      .then((thisUser) =>{
        res.render('main/edit-needy-profile', {user: thisUser})
       })
       .catch((err) => {
        res.render('error', {err})
      })
});
router.post('/my-n-profile/:myId/edit',fileUpload.single('photo'), (req, res) =>{
  let myEditedId = req.params.myId;
  let {firstName, lastName, address, postCode, description} = req.body;
  let fileUrlOnCloudinary = req.session.currentUser.photo;
  if(req.file) {
    fileUrlOnCloudinary = req.file.path;
  }
  User.findByIdAndUpdate(myEditedId,{firstName, lastName, address, postCode, description, photo:fileUrlOnCloudinary}, {new: true})
  .then((user)=>{
    res.redirect(`/my-n-profile/${user._id}`)
  })
  .catch((err) => {
    res.render('error', {err})
  });
}); 

router.get('/my-h-profile/:myUserId/edit', (req, res) => {
  let userId = req.params.myUserId;
  User.findById(userId)
    .populate('serviceType')
      .then((thisUser) =>{
        res.render('main/edit-helper-profile', {user: thisUser})
       })
       .catch((err) => {
        res.render('error', {err})
      })
});
router.post('/my-h-profile/:myId/edit',fileUpload.single('photo'), (req, res) =>{
  let myEditedId = req.params.myId;
  let {firstName, lastName, address, postCode, description} = req.body;
  let fileUrlOnCloudinary = req.session.currentUser.photo;
  if(req.file) {
    fileUrlOnCloudinary = req.file.path;
  }
  User.findByIdAndUpdate(myEditedId,{firstName, lastName, address, postCode, description, photo:fileUrlOnCloudinary}, {new: true})
  .then((user)=>{
    res.redirect(`/my-h-profile/${user._id}`)
  })
  .catch((err) => {
    res.render('error', {err})
  });
}); 








// ACCESS HELPERS PROFILES FROM THE MAP OR THE FAIR
// create a private route for users logged to see their account.
router.get('/h-profile/:otherUserId', (req, res) =>{
  let otherUserId = req.params.otherUserId;
  User.findById(otherUserId)
  .populate('serviceType')
  .then((thisUser) => {
    res.render('main/other-helper-profile', {otherUser: thisUser})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
});


// ACCESS NEEDY PROFILES FROM THE MAP OR THE FAIR
// create a private route for users logged to see their account.
router.get('/n-profile/:otherUserId', (req, res) =>{
  let otherUserId = req.params.otherUserId;
  User.findById(otherUserId)
  .populate('inNeedType')
  .then((thisUser) => {
    res.render('main/other-needy-profile', {otherUser: thisUser})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
});


module.exports = router;