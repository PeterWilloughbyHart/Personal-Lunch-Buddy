const bcrypt = require('bcryptjs')

// REGISTER //

const signup = async (req, res, next) => {
    console.log("hit hit hit hit")
    const { username, password, name, age, bio, email, phone, city, state, zip, img} = req.body;
    const hash = await bcrypt.hash(password, 10);

    const db = req.app.get("db");
    const result = await db.signup([username, hash, name, age, bio, email, phone, city, state, zip, img]);

    req.session.user = { id: result[0].id, username: result[0].username, password: result[0].password, name: result[0].name, age: result[0].age, bio: result[0].bio, email: result[0].email, phone: result[0].phone, city: result[0].city, state: result[0].state, zip: result[0].zip, img: result[0].img };

    //try replacing below code with next() to login;

   next()
};
 
// EDIT //

const edit = async (req, res) => {
    const {username, name, age, bio, email, phone, city, state, zip, img } = req.body;
    const db = req.app.get("db");
    const result = await db.edit_profile([username, name, age, bio, email, phone, city, state, zip, img])
    if (result.err) {console.log("error with response in edit method");}
    else { console.log(result, result[0].username)};
    req.session.user = {id: result[0].id, username: result[0].username, password: result[0].password, name: result[0].name, age: result[0].age, bio: result[0].bio, email: result[0].email, phone: result[0].phone, city: result[0].city, state: result[0].state, zip: result[0].zip, img: result[0].img};
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

const getsession = (req, res) => {
    res.json(req.session.user);
}

// Logout //

const logout = (req, res) => {
    req.session.destroy();
}


module.exports = {signup, edit, login, logout , getsession, deactivate}
