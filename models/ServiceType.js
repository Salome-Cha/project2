const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const serviceTypeSchema = new Schema ({
  name: {
    type: String,
    required: true,
    enum: ['Food', 'Healthcare', 'Hosting', 'Administrative Help']
  },

  color: String,

  subServices: {
    type: String,
    required: true,
    enum: ['Doctor', 'Nurse', 'Lawyer', 'Restaurant','Grocery Store','Individual','Landlord','test','test','test','test', 'other volunteer']
  
});




module.exports = model('ServiceType', serviceTypeSchema);