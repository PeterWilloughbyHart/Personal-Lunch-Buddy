require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const app = express();
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;
const { signup, edit, login, logout, getsession, deactivate} = require('./Controller/UserAuth');
const { storelocation } = require('./Controller/mapscontroller')
const { sendEmail } = require('./Controller/nodemailercontroller')

// Droplet Stuff //
app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})


// User Auth //
app.post('/auth/signup', signup, sendEmail, login);
app.post('/auth/login', login);
app.put('/auth/edit', edit);
app.delete('/auth/deactivate/:id', deactivate);
app.get('/auth/logout', logout);
app.get('/auth/cookie', getsession);

// User Location //
app.post('/api/location', storelocation);

app.listen(SERVER_PORT, () => console.log('mic check one two'));

