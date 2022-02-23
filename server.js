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
      host : process.env.DATBASE_URL,
      ssl: true
    }
  });

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => res.send('It is working!'));
app.post('/signin',signin.handleSignin(db, bcrypt));
app.post('/register',register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfile(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});