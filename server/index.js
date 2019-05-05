require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const app = express();
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;
const { signup, edit, login, logout, getsession } = require('./Controller/UserAuth');

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
app.post('/auth/signup', signup);
app.put('/auth/edit', edit)
app.post('/auth/login', login);
app.get('/auth/logout', logout);
app.get('/auth/cookie', getsession);

app.listen(SERVER_PORT, () => console.log('mic check one two'));

