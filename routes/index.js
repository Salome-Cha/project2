const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const NeedyType = require('../models/NeedyType');
const ServiceType = require('../models/ServiceType');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get('/authors/create', (req, res) => {
  res.render('author-create');
});

router.post('/authors/create', async (req, res) =>{
  try {
    let { name } = req.body;
    const authorCreated = await Author.create({name});
    res.redirect('/books');
  } catch (error) {
    res.render(error);
  }
})

module.exports = router;
