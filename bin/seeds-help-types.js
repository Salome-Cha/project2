const mongoose = require('mongoose');
const HelpType= require('../models/HelpType.js');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const helps = [
  {name: 'food',
  color: 'turchese',
  subServices: 'restaurant'
  },
  {name: 'food',
  color: 'turchese',
  subServices: 'grocery store'
  },
  {name: 'food',
  color: 'turchese',
  subServices: 'volunteer'
  },
  {name: 'hosting',
  color: 'blue',
  subServices: 'landlord'
  },
  {name: 'hosting',
  color: 'blue',
  subServices: 'resident'
  },
  {name: 'hosting',
  color: 'blue',
  subServices: 'hotel'
  },
  {name: 'hosting',
  color: 'blue',
  subServices: 'other'
  },
  {name: 'administrative',
  color: 'peach',
  subServices: 'lawyer'
  },
  {name: 'administrative',
  color: 'peach',
  subServices: 'public advisor'
  },
  {name: 'administrative',
  color: 'peach',
  subServices: 'volunteer'
  },
  {name: 'healthcare',
  color: 'navy',
  subServices: 'doctor'
  },
  {name: 'healthcare',
  color: 'navy',
  subServices: 'nurse'
  },
  {name: 'healthcare',
  color: 'navy',
  subServices: 'medical student'
  },
  {name: 'healthcare',
  color: 'navy',
  subServices: 'psychologist'
  }
];

// Then we create the types.
HelpType.create(helps)
  .then(helpsFromSeed=> {
    console.log(`Created ${helpsFromSeed.length} help types.`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating help types from the DB: ${err}`));