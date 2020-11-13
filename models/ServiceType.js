const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const serviceTypeSchema = new Schema ({
  name: Array
  -->enum,(4cat)

  color: String, (route create with if )
  subServices: [String]
  
});




module.exports = model('ServiceType', serviceTypeSchema);