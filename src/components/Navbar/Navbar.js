import React, {Component} from 'react';
import styles from './Navbar.module.scss';
import { logout, getsession } from '../../Ducks/UserAuth'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends Component {
    constructor(props){
        super(props)
    }

logout(e) {
        e.preventDefault(); // prevents the element action of an element from happening. ex. prevents a link from following the URL, submit from submitting a form

        this.props.logout().catch(err => console.log(err));
        this.props.getsession();
    }

render() {
    return(
        <nav className={styles.welcome}>
            <div className={styles.logo}>
                <img src="https://cdn.clipart.email/e50c4d360c61095951169f18e2966fca_28-collection-of-lunch-clipart-transparent-background-high-_372-590.png"/>
                <h1>LunchBuddy</h1> 
            </div>
            <div className={styles.profile}>
                <h5>{this.props.auth.name}</h5>
                <Link to="/EditProfile"><img height="64px" width="64px" src={this.props.auth.img}/></Link>
                <button className={styles.logout_button} onClick={e => this.logout(e)}>Logout</button>
            </div>
        </nav>
    )
}
}


const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { logout, getsession })(Navbar);