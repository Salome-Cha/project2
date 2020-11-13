const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema ({
  name: String,
  username: String,
  firstName: String,
  photo: String,
  description: String,
  password: String,
  address: String,
  helper: Boolean,
  needy: Boolean,
  serviceType: {
    type: Schema.Types.ObjectId, // link to 
    ref: 'serviceType' 
  },
  inNeedType: {
    type: Schema.Types.ObjectId, //foreign key
    ref: 'needType' // relates to Author Model
  },



});




module.exports = model('User', userSchema);