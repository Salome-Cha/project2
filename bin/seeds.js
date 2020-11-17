const mongoose = require('mongoose');
const Book = require('../models/Book.js');
const DB_NAME = 'library-project';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

