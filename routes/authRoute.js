const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');




router.get('/signup', (req, res) =>{
  res.render('auth/signup');
});



router.get('/login', (req, res) =>{
  res.render('auth/login');
});



module.exports = router;