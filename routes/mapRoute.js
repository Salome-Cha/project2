const express = require('express');
const router  = express.Router();

router.get('/helper-map', (req, res) =>{
  res.render('map/helper-map');
})

router.get('/needy-map', (req, res) =>{
  res.render('map/needy-map');
})



module.exports = router;
