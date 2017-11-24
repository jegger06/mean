const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const User = require('./models/User'); // Delete this

// Load keys
const keys = require('./config/keys');

// Set the Promise for mongoose to global Promise
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(keys.mongoURI, {
  useMongoClient: true
}).then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Initialize app
const app = express();

// Load Routes
const users = require('./routes/users');

// cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// body-parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Use Routes
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  User.find({}).then((users) => {
    res.json({ users: users });
  });
  // res.send('Invalid Endpoint'); // Uncomment this later and remove the query above this.
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});