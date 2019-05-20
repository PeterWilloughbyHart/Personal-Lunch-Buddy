import React, {Component} from 'react';
import { signup, login, getsession } from '../../Ducks/UserAuth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './RegisterUser.module.scss';
import Axios from 'axios';

const {REACT_APP_KEY} = process.env;

class RegisterUser extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: "",
            password: "",
            name: "",
            age: "",
            bio: "",
            email: "",
            phone: "",
            city: "",
            state: "",
            zip: "",
            img: ""
        }
    }

    componentDidMount() {
        this.props.getsession()
    }

    async submit(e) {
        e.preventDefault();
        console.log('hit');

        const {username, password, name, age, bio, email, phone, city, state, zip, img} = this.state;
        await this.props.signup(username, password, name, age, bio, email, phone, city, state, zip, img);
        Axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_KEY}`).then(res => {
            Axios.post("/api/location", {lat: res.data.location.lat, lng: res.data.location.lng, id: this.props.auth.id }).then(res => console.log(res))
        })
    }

    render() {
        if(this.props.auth.username){
            return (
                <Redirect to="/Main"/> // if there is a user, redirect to main page
        )
    }
    console.log(this.props.auth)
        return(
            <div>
                {this.props.auth.username &&  <Redirect to="/Main"/>}
                <section className={styles.registry_section}>
                <section className={styles.top_container}>
                <form className={styles.registry_form}>
                <h1>Register with LunchBuddy</h1>
                <div>
                    <input autocomplete="off" placeholder="Username:" onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input type="password" placeholder="Password:" onChange={(e) => this.setState({password: e.target.value})}></input>
                </div>
                    <input placeholder="Full Name:" onChange={(e) => this.setState({name: e.target.value})}></input>
                    <input placeholder="Age:" onChange={(e) => this.setState({age: e.target.value})}></input>
                    <input placeholder="Bio:" onChange={(e) => this.setState({bio: e.target.value})}></input>
                    <input placeholder="Email:" onChange={(e) => this.setState({email: e.target.value})}></input>
                    <input placeholder="Phone:" onChange={(e) => this.setState({phone: e.target.value})}></input>
                    <input placeholder="City:" onChange={(e) => this.setState({city: e.target.value})}></input>
                    <input placeholder="State:" onChange={(e) => this.setState({state: e.target.value})}></input>
                    <input placeholder="Zip:" onChange={(e) => this.setState({zip: e.target.value})}></input>
                    <input placeholder="Profile Url:" onChange={(e) => this.setState({img: e.target.value})}></input>
                    <button onClick={(e) => this.submit(e)}> Submit </button>
                </form>
                <div className={styles.top_container_right}>
                <div className={styles.top_container_right_image}></div>
                <div className={styles.top_container_right_text}><h1>Find Your Favorites</h1></div>
                </div>
                </section>
                <div className={styles.right_of_form}></div>
                <section className={styles.registry_images}>
                    <div className={styles.left}>
                    <div className={styles.bottom_left}></div> 
                    <div className={styles.top_left}></div>
                    </div>
                    <div className={styles.right}>
                    <div className={styles.top_right}></div>
                    <div className={styles.bottom_right}><h3>LunchBuddy™</h3></div>
                    </div>
                </section>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { signup, login, getsession })(RegisterUser);

// export default RegisterUser;