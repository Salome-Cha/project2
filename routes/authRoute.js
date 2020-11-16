const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const { route } = require('.');
const { model } = require('../models/User');


router.get('/signup', (req, res) =>{
  res.render('');
})



module.exports = router;