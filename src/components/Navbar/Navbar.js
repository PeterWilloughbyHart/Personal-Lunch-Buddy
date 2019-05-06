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
        <div>
        <nav className={styles.welcome}>
            <div className={styles.logo}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKO7N15yCr44wAfgwGZd5A84h4wAUGsL1BtidAaA4UyjOemPLPVw"/>
                <h1>LunchBuddy</h1> 
            </div>
            <div className={styles.profile}>
                <h5>{this.props.auth.name}</h5>
                {this.props.auth.username ? (
                <Link to="/EditProfile"><img height="52px" width="52px" src={this.props.auth.img}/></Link>) : (<Link to="/EditProfile"><img height="50px" width="50px" src="https://img.icons8.com/windows/64/000000/user.png"/></Link>)}
                <button className={styles.logout_button} onClick={e => this.logout(e)}>Logout</button>
            </div>
        </nav>
        <div className={styles.container}>
        <div className={styles.left_wall}/>
        <div className={styles.right_wall}/>
        </div>
        </div>
    )
}
}


const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { logout, getsession })(Navbar);