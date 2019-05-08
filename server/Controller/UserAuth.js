const bcrypt = require('bcryptjs')

// REGISTER //

const signup = async (req, res) => {
    const db = req.app.get("db");
    const { username, password, name, age, bio, email, city, state, zip, img } = req.body;
    const hash = await bcrypt.hash(password, 10);
    
    const result = db.signup([username, hash, name, age, bio, email, city, state, zip, img]).catch(err => {
        res.status(400).json("username already exist");  
    });
    
    // req.session.user = { username: result[0].username };
    // res.json({ username: result[0].username }); 
};

// EDIT //

const edit = async (req, res) => {
    const db = req.app.get("db");
    const {session, username, name, age, bio, email, city, state, zip, img } = req.body;

    const result = db.edit_profile([session, username, name, age, bio, email, city, state, zip, img]).catch(err => {
        res.status(400).json("error on edit method");

        req.session.user = { username: result[0].username };
        res.json(req.session.user) // put this back
    });   
}

// DEACTIVATE //
const deactivate = async (req, res) => {
    const db = req.app.get("db");
    const {username, password} = req.body;
    console.log("username:", username, "password:", password)

    const results = await db.login(username);
    if(results[0]) {
        const isMatch = await bcrypt.compare(
            password,
            results[0].password
        );
        if (isMatch) {
            db.remove_account(login);
        }
    }
}

// LOGIN //

const login = async (req, res) => {
    console.log('hit on login in controller')
    const db = req.app.get("db");
    const { password, username } = req.body;
    console.log( username, password, "login, controller" )
    const results = await db.login(username);
    if(results[0]) {
        const isMatch = await bcrypt.compare(
            password,
            results[0].password
        );
        if(isMatch) {
            req.session.user = {
                username: results[0].username,
                password: results[0].password,
                name: results[0].name,
                age: results[0].age,
                bio: results[0].bio,
                email: results[0].email,
                city: results[0].city,
                state: results[0].state,
                zip: results[0].zip,
                img: results[0].img
            };
            console.log(results[0])
            res.json(req.session.user);
        } 
        else {
            res.status(403).json('Wrong Login Info')
        }
    }
}

// Keep session on refresh //
const getsession = (req, res, next) => {
    console.log('get session')
    const { session } = req;
    if(!session.user) {
        session.user = { username: "" }; //explain what's happening here
    }
    res.json(session.user);
    next();
}

// Logout //

const logout = (req, res) => {
    console.log("hit in logout middleware")
    req.session.destroy();
    console.log(req.session) // should log undefined
}


module.exports = {
    signup,
    edit,
    login,
    logout,
    getsession,
    deactivate
}
