const express = require('express');
const router  = express.Router();


// GET THE HELPER MAP
router.get('/helper-map', (req, res) =>{

  const markers = [
    { lat: 38.7129146, lng: -9.1286218 },
    { lat: 38.7117206, lng: -9.1264315 },
    { lat: 38.7123872, lng: -9.1287935}
  ];
  let markersString = JSON.stringify(markers);
  res.render('map/helper-map', {markers: markersString});
})


// GET THE NEEDY MAP
router.get('/needy-map', (req, res) =>{

  const markers = [
    { lat: 38.7129146, lng: -9.1286218 },
    { lat: 38.7117206, lng: -9.1264315 },
    { lat: 38.7123872, lng: -9.1287935}
  ];
  let markersString = JSON.stringify(markers);

  res.render('map/needy-map', {markers: markersString});
})

module.exports = router;

