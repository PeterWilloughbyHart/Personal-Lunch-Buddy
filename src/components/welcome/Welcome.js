import React, { Component } from 'react';
import styles from './Welcome.module.scss';
import { login, logout, getsession } from '../../Ducks/UserAuth';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';


class Welcome extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            ping: {}
        }
    }

    componentDidMount() {
        this.props.getsession().catch(err => console.log(err))
    }

    login(e) {
        e.preventDefault();
        
        const { username, password } = this.state;
        this.props.login(username, password)
        .catch(err => console.log(err));
        this.props.getsession();
    }

    logout(e) {
        e.preventDefault(); // prevents the element action of an element from happening. ex. prevents a link from following the URL, submit from submitting a form

        this.props.logout().catch(err => console.log(err));
        this.props.getsession();
    }

    render() {
        if(this.props.auth.name){
            return (
                <Redirect to="/Main"/> // if there is a user, redirect to main page
            )
        }
        return (
            <div>
                <section className={styles.explanation_box_section}>
                <div className={styles.explanation_box_section_opacity}>
                    <section className={styles.input_stretch}>
                        <div className={styles.login_box_space}>
                        <div className={styles.login_box}>
                        <input placeholder="username here:" onChange={(e) => this.setState({username: e.target.value})}/>
                        <input placeholder="password here:" onChange={(e) => this.setState({password: e.target.value})} type="password"/>
                        <button className={styles.login_button} onClick={e => this.login(e)}>Login</button>
                        <button className={styles.logout_button} onClick={e => this.logout(e)}>Logout</button>
                        </div>
                        </div>
                    
                    </section>
                        <div className={styles.explanation_box_div}>
                            <div className={styles.explanation_text_box}>
                                <h1>Explanation</h1>
                                <p>get lunch with a friend</p>
                            </div>
                            <div className={styles.register_button_box}>
                                <img height="150px" width="150px" src="https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png"/>
                                <Link to="/Register"><button>Register</button></Link>
                            </div>
                        </div>
                        </div>
                    </section>
                    <section className={styles.welcome_info}>
                        <div className={styles.pizza_box_space}>
                        <div className={styles.pizza_box}>
                                <img src="https://i.ibb.co/vXWc521/Project-Drawing-11274036410184917128.png"/>
                                <p>Get food with another person. <br/> It's important for your sanity</p>
                        </div>
                        </div>
                        <div className={styles.salad_box_space}>
                        <div className={styles.salad_box}>
                                <p>Get food with another person. <br/> It's important for your sanity</p>
                                <img src=""/>
                        </div>
                        </div>
                    </section>
                    <section className={styles.footer}>
                    </section>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(mapStateToProps, { login, logout, getsession })(Welcome);