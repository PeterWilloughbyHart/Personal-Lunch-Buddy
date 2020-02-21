const bcrypt = require('bcryptjs')

// REGISTER //

const signup = async (req, res, next) => {
    const { username, password, name, age, bio, email, phone, city, state, zip, img} = req.body;
    const hash = await bcrypt.hash(password, 10);

    const db = req.app.get("db");
    const results = await db.signup([username, hash, name, age, bio, email, phone, city, state, zip, img]);

    req.session.user = { id: results[0].id, username: results[0].username };

    const result = await db.login(username);
        if (result[0]) {

            const isMatch = await bcrypt.compare( password, result[0].password);

            if (isMatch) {
                req.session.user = {id, username, password, name, age, bio, email, phone, city, state, zip, img};
                res.json(req.session.user);
            } 
            else {
                res.status(403).json('Error with signup')
            }
     }
};
 
// EDIT //

const edit = async (req, res) => {
    const {username, name, age, bio, email, phone, city, state, zip, img } = req.body;
    const db = req.app.get("db");
    const result = await db.edit_profile([username, name, age, bio, email, phone, city, state, zip, img])
    if (result.err) {console.log("error with response in edit method");}
    else { console.log(result, result[0].username)};
    // req.session.user = {id, username, password, name, age, bio, email, phone, city, state, zip, img};
    res.json(result);
}

// DEACTIVATE //
const deactivate = async (req, res) => {
    const db = req.app.get("db");
    const result = await db.remove_account(req.params.id);
    res.json(result)
}

// LOGIN //

const login = async (req, res) => {
    const db = req.app.get("db");
    const results = await db.login(req.body.username);

    if(results[0]) {
        
        const isMatch = await bcrypt.compare( req.body.password, results[0].password);
        
        if(isMatch) {
            const {id, username, password, name, age, bio, email, phone, city, state, zip, img} = results[0];
            req.session.user = {id, username, password, name, age, bio, email, phone, city, state, zip, img};
            res.json(req.session.user);
        } 

        else {
            res.status(403).json('Wrong Login Info')
        }
    }
}

// Keep session on refresh //

const getsession = (req, res, next) => {
    console.log(req.session.user)
    const { session } = req;
    res.json(session.user);
    next();
}

// Logout //

const logout = (req, res) => {
    req.session.destroy();
}


module.exports = {signup, edit, login, logout , getsession, deactivate}
