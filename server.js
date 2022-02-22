const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { user } = require('pg/lib/defaults');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'pass',
      database : 'smart-brain'
    }
  });

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('success');
});

app.post('/signin',signin.handleSignin(db, bcrypt));
app.post('/register',register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

app.listen(3000, () => {
    console.log('app is running on port 3000');
});