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
    enum: ['doctor', 'nurse', 'psychologist', 'medical student', 'lawyer', 'public advisor', 'volunteer', 'resident', 'landlord', 'hotel', 'restaurant', 'grocery store','other' ]
  }
});


module.exports = model('HelpType', helpTypeSchema);
