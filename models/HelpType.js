const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const helpTypeSchema = new Schema ({
  name: {
    type: String,
    required: true,
   // enum: ['food', 'healthcare', 'hosting', 'administrative help']
  },

  color: String,

  subServices: {
    type: String,
    required: true,
    enum: ['Doctor', 'Nurse', 'Psychologist', 'Lawyer', 'Restaurant','Grocery Store','Individual','Landlord','test','test','test','test', 'other volunteer']
  }
});


module.exports = model('HelpType', helpTypeSchema);