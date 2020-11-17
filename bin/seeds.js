const mongoose = require('mongoose');
const User = require('../models/User.js');

const DB_NAME = 'project';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const users = [
  {
    firstName: 'Rodrigo',
    lastName: 'Prudencio',
    userName: 'Rodru',
    photo: '/images/user-default-pic.png',
    email: 'rod.pru@gmail.com',
    description: "Willing to help everyone in need for adminsitrative tasks. I love meeting with new people, and I'll be please to support anyone who need",
    password: 'XXX',
    address: "Jardim do Tabaco, 12",
    postCode:'1100-651',
    city: 'Lisbon',
    country: 'Portugal',
    userType: 'helper',
    serviceType: {
    type: '5fb3f8ce853667948c04fed5', 
    ref: 'serviceType' 
  }
},
{
  firstName: 'Mélissa',
  lastName: 'Theuriau',
  userName: 'MeliTh',
  photo: '/images/user-default-pic.png',
  email: 'meliss.Th@gmail.com',
  description: "I'm a nurse and I can help people who need medical cares in Lisbon every weekend, when I'm not working in the hospital. Feel free to contact me.",
  password: 'XXX',
  address: "Jardim do Tabaco, 76",
  postCode:'1100-651',
  city: 'Lisbon',
  country: 'Portugal',
  userType: 'helper',
  serviceType: {
  type: '5fb3f8ce853667948c04fed0', 
  ref: 'serviceType' 
}
},
{
  firstName: 'Angelo',
  lastName: 'Semestrio',
  userName: 'AngeloSeme',
  photo: '/images/user-default-pic.png',
  email: 'angelo.leon@gmail.com',
  description: "I'm in Lisbon for 3 weeks and I need a hosting solution to sleep next week with my kids",
  password: 'XXX',
  address: "Santa Apolonia, 76",
  postCode:'1100-105',
  city: 'Lisbon',
  country: 'Portugal',
  userType: 'needy',
  inNeedType: {
  type: '5fb3f903cdc6ec94f4febc43', //foreign key
  ref: 'NeedyType'
}
},
{
  firstName: 'Salomé',
  lastName: 'Char',
  userName: 'Salome-Cha',
  photo: '/images/user-default-pic.png',
  email: 'salome.charpignon@gmail.com',
  description: "I'm in Lisbon to study webdev. I'm willign to help by providing food to those amongst you who need. Please contact me, I'll be happy to help.",
  password: 'XXX',
  address: "Calcada cascao, 35",
  postCode:'1100-122',
  city: 'Lisbon',
  country: 'Portugal',
  userType: 'helper',
  serviceType: {
  type: '5fb3f8ce853667948c04fecc', 
  ref: 'serviceType' 
}
},
{
  firstName: 'Cassy',
  lastName: 'Malovia',
  userName: 'Cassy-Malo',
  photo: '/images/user-default-pic.png',
  email: 'cassy.malo@gmail.com',
  description: "I lost my job a few months ago due to covid and I'm searching a place to sleep for the next two weeks.",
  password: 'XXX',
  address: "R. Silveira Peixoto 7",  
  postCode:'1900-414',
  city: 'Lisbon',
  country: 'Portugal',
  userType: 'needy',
  inNeedType: {
  type: '5fb3f903cdc6ec94f4febc41', 
  ref: 'NeedyType'
}
},
{
  firstName: 'Fransisco',
  lastName: 'Joaon',
  userName: 'FransiscoJoa',
  photo: '/images/user-default-pic.png',
  email: 'fransisco.joaon@gmail.com',
  description: "I own a restaurant in Lisbon. I know how solidarity is essential to get through hard times. I'm willing to offer free meal for homeless person every evening. I'm closing the restaurant at 10pm. Please ask for me directly at the entrance door.",
  password: 'XXX',
  address: "12 Rua Augusto Machado",  
  postCode:'1000-055',
  city: 'Lisbon',
  country: 'Portugal',
  userType: 'helper',
  serviceType: {
  type: '5fb3f8ce853667948c04fec9', 
  ref: 'serviceType' 
}
},
{
  firstName: 'Ana',
  lastName: 'Pierra',
  userName: 'AnaPie',
  photo: '/images/user-default-pic.png',
  email: 'anna.pierra@gmail.com',
  description: "I have health problems for 3 years now, and I can't afford the medical consultation this months, because of unexpected bills to pay. Could someone help me?",
  password: 'XXX',
  address: "Beco da Cardosa",  
  postCode:'1100-563',
  city: 'Lisbon',
  country: 'Portugal',
  userType: 'needy',
  inNeedType: {
  type: '5fb3f903cdc6ec94f4febc40', //foreign key
  ref: 'NeedyType'
}
},
];



User.create(users)
  .then(usersFromSeed=> {
    console.log(`Created ${usersFromSeed.length} users`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating users from the DB: ${err}`));