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
        this.props.getsession().catch(err => console.log(err));
        // window.location.reload();
    }

    login(e) {
        e.preventDefault();
        
        const { username, password } = this.state;
        this.props.login(username, password)
        .catch(err => console.log(err))
        .then(this.props.getsession());
    }

    logout(e) {
        e.preventDefault(); // prevents the element action of an element from happening. ex. prevents a link from following the URL, submit from submitting a form

        this.props.logout().catch(err => console.log(err));
        this.props.getsession();
    }

    render() {
        if(this.props.auth.username){
            return (
                <Redirect to="/Main"/> // if there is a user, redirect to main page
            )
        }
        return (
            <div>
                <section className={styles.explanation_box_section}>
                <div className={styles.explanation_box_section_opacity}>
                    <section className={styles.input_stretch}>
                    <div className={styles.tagline_space}>
                        <h1>Talk While You Chew</h1>
                    </div>
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
                                <h1>How We're Here for You</h1>
                                <p>We help you make lunch more fun, and more about your community</p>
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
                        <p>We're so happy to see you trying LunchBuddy! <br/> We hope that you find value in it that
                        is made unique by you and your friends. Everyday, we recieve fun to read stories about both new connections made in
                        people's long held home town and even people that have just moved in!
                        We should let you know, we aren't exactly the same as a lot of other match making apps. But we find that refreshing.
                        We give you only 5 buddy choices as opposed to a solid hundred or so that you'd receive elsewhere. <br/> We encourage you to pick from that selection!
                        </p>
                        <div>
                        <h3>LunchBuddy™</h3>
                        </div>
                        </div>
                        </div>
                        <div className={styles.salad_box_space}>
                        <div className={styles.salad_box}>
                        <img src="https://images.unsplash.com/photo-1531947398206-60f8e97f34a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
                        </div>
                        </div>
                    </section>
                    <section className={styles.footer}>
                    <ul>
                        <li>home</li>
                        <li>about</li>
                        <li>edit profile</li>
                        <li>cravings</li>
                        <li>buddy up</li>
                    </ul>
                    </section>
            </div>
        )
    }
}

const mapStateToProps = reduxStore => reduxStore;

export default connect(mapStateToProps, { login, logout, getsession })(Welcome);