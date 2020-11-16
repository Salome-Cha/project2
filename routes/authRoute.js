const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');




router.get('/signup', (req, res) =>{
  res.render('auth/signup');
});
router.post('/signup', async (req, res) =>{
  try {
    const {firstName, lastName, userName, photo, email, description, password, address, postCode, city, country, helper, needy, serviceType, inNeedType} = req.body;
    const userSignedIn = await User.create({firstName, lastName, userName, photo, email, description, password, address, postCode, city, country, helper, needy, serviceType, inNeedType});
    res.redirect('/index');
  } catch (error) {
    res.render('error')
  }
})



router.get('/login', (req, res) =>{
  res.render('auth/login');
});



module.exports = router;