import axios from 'axios';

const initialState = {
    username: "",
    password: "",
    name: "",
    age: "",
    bio: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    img: ""
}

// Action Types //

const SIGN_UP = "SIGN_UP";
const EDIT_PROFILE = "EDIT_PROFILE";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GETSESSION = "GETSESSION";

// Action Creators //

export function signup(username, password, name, age, bio, email, city, state, zip, img) {
    console.log('signup')
    return {
        type: SIGN_UP,
        payload: axios.post("/auth/signup", {username, password, name, age, bio, email, city, state, zip, img})
    }
}

export function edit(session, username, name, age, bio, email, city, state, zip, img) {
    console.log("hit on edit in ducks");
    return {
        type: EDIT_PROFILE,
        payload: axios.put("/auth/edit", {session, username, name, age, bio, email, city, state, zip, img})
    }
}

export function login(username, password) {
    console.log('login, ducks.')
    return {
        type: LOGIN,
        payload: axios.post("/auth/login", {username, password})
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: axios.get('/auth/logout')
    }
}

export function getsession() {
    return {
        type: GETSESSION,
        payload: axios.get('/auth/cookie')
    }
}

// Reducer //

export default function reducer(state=initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SIGN_UP + "_FULFILLED":
        return {
            ...state, username: payload.data.username
        }
        case LOGIN + "_FULFILLED":
        return {
            ...state, 
            username: payload.data.username,  // Set this whole object to a variable so you can call it with a word
            password: payload.data.password,
            name: payload.data.name,
            age: payload.data.age,
            bio: payload.data.bio,
            email: payload.data.email,
            city: payload.data.city,
            state: payload.data.state,
            zip: payload.data.zip,
            img: payload.data.img
        }
        case LOGOUT + "_FULFILLED":
        return {
            ...state, 
            username: payload.data.username,
            password: payload.data.password,
            name: payload.data.name,
            age: payload.data.age,
            bio: payload.data.bio,
            email: payload.data.email,
            city: payload.data.city,
            state: payload.data.state,
            zip: payload.data.zip,
            img: payload.data.img
        }
        case GETSESSION + "_FULFILLED":
        return {
            ...state, 
            username: payload.data.username,
            password: payload.data.password,
            name: payload.data.name,
            age: payload.data.age,
            bio: payload.data.bio,
            email: payload.data.email,
            city: payload.data.city,
            state: payload.data.state,
            zip: payload.data.zip,
            img: payload.data.img
        }
        case EDIT_PROFILE + "_FULFILLED":
        return {
            ...state, 
            username: payload.data.username // put this back
        }
        default: 
        return state;
    }
}