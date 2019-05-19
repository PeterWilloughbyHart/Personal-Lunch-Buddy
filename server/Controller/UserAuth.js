const bcrypt = require('bcryptjs')

// REGISTER //

const signup = async (req, res, next) => {
    const db = req.app.get("db");
    const { username, password, name, age, bio, email, phone, city, state, zip, img} = req.body;
    const hash = await bcrypt.hash(password, 10);
    
    const results = await db.signup([username, hash, name, age, bio, email, phone, city, state, zip, img]);

        req.session.user = {
            id: results[0].id,
            username: results[0].username }

            const result = await db.login(username);
            if(result[0]) {
                const isMatch = await bcrypt.compare(
                    password,
                    result[0].password
                );
                if(isMatch) {
                    req.session.user = {
                        id: result[0].id,
                        username: result[0].username,
                        password: result[0].password,
                        name: result[0].name,
                        age: result[0].age,
                        bio: result[0].bio,
                        email: result[0].email,
                        phone: result[0].phone,
                        city: result[0].city,
                        state: result[0].state,
                        zip: result[0].zip,
                        img: result[0].img
                    };
                    console.log(result[0])
                    res.json(req.session.user);
                } 
                else {
                    res.status(403).json('Wrong Login Info')
                }
            }
};

// req.session.user = { username: result[0].username };
// res.json({ username: result[0].username }); 
    
// EDIT //

const edit = async (req, res) => {
    const db = req.app.get("db");
    const {session, username, name, age, bio, email, phone, city, state, zip, img } = req.body;

    const result = db.edit_profile([session, username, name, age, bio, email, phone, city, state, zip, img]).catch(err => {
        res.status(400).json("error on edit method");

        req.session.user = { username: result[0].username };
        res.json(req.session.user) // put this back
    });   
}

// DEACTIVATE //
const deactivate = async (req, res) => {
    const db = req.app.get("db");
    console.log("hey:", req.params.id)

    const result = await db.remove_account(req.params.id);
    res.json(result)
}

// LOGIN //

const login = async (req, res, next) => {
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
                id: results[0].id,
                username: results[0].username,
                password: results[0].password,
                name: results[0].name,
                age: results[0].age,
                bio: results[0].bio,
                email: results[0].email,
                phone: results[0].phone,
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
    next()
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
