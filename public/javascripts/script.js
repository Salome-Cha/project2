document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

//Helper Map Initiation
let helperMap;
function initMap() {
  const lisbon = { lat: 38.7117206, lng: -9.1264315 };
  map = new google.maps.Map(document.getElementById('helperMap'), {
    zoom: 17,
    center: lisbon
  })
}

//Needy Map Initiation
let needyMap;
function initMap() {
  const lisbon = { lat: 38.7117206, lng: -9.1264315 };
  map = new google.maps.Map(document.getElementById('needyMap'), {
    zoom: 17,
    center: lisbon
  })
}