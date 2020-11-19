const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const myStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'proj2',
    allowedFormats: ['jpg', 'png', 'mp3'],
  },
  filename: function(req, file, cb) {  // to store the file with the original name(usermanual function)
    cb(null, file.originalname)
  }
});

const uploadCloud = multer({ storage: myStorage }); 
module.exports = uploadCloud;