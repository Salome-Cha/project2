const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const NeedyType = require('../models/NeedyType');
const ServiceType = require('../models/ServiceType');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('main/homepage');
});


module.exports = router;
