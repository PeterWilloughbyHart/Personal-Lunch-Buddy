import React, {Component} from 'react';
import { signup, login } from '../../Ducks/UserAuth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styles from './RegisterUser.module.scss';


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
            city: "",
            state: "",
            zip: "",
            img: ""
        }
    }

    

    submit(e) {
        e.preventDefault();
        console.log('hit');

        const {username, password, name, age, bio, email, city, state, zip, img} = this.state;
        this.props.signup(username, password, name, age, bio, email, city, state, zip, img);
        this.props.login(username, password);
    }

    render() {
        if(this.props.auth.username){
            return (
                <Redirect to="/Main"/> // if there is a user, redirect to main page
        )
    }
        return(
            <div>
                <section className={styles.registry_section}>
                <form className={styles.registry_form}>
                <h1>Register with LunchBuddy!</h1>
                    <input placeholder="username" onChange={(e) => this.setState({username: e.target.value})}></input>
                    <input placeholder="password" onChange={(e) => this.setState({password: e.target.value})}></input>
                    <input placeholder="name" onChange={(e) => this.setState({name: e.target.value})}></input>
                    <input placeholder="age" onChange={(e) => this.setState({age: e.target.value})}></input>
                    <input placeholder="bio" onChange={(e) => this.setState({bio: e.target.value})}></input>
                    <input placeholder="email" onChange={(e) => this.setState({email: e.target.value})}></input>
                    <input placeholder="city" onChange={(e) => this.setState({city: e.target.value})}></input>
                    <input placeholder="state" onChange={(e) => this.setState({state: e.target.value})}></input>
                    <input placeholder="zip" onChange={(e) => this.setState({zip: e.target.value})}></input>
                    <input placeholder="profile url" onChange={(e) => this.setState({img: e.target.value})}></input>
                    <button onClick={(e) => this.submit(e)}> Submit </button>
                </form>
                {/* <section className={styles.waitress}>
                <img src="https://i.dlpng.com/static/png/214099_thumb.png"/>
                </section> */}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { signup, login })(RegisterUser);

// export default RegisterUser;