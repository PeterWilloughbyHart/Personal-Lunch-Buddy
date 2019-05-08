import React, {Component} from 'react';
import styles from './Navbar.module.scss';
import { logout, getsession } from '../../Ducks/UserAuth'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            dropdown: "shut"
        }
    }

logout(e) {
        e.preventDefault(); // prevents the element action of an element from happening. ex. prevents a link from following the URL, submit from submitting a form

        this.props.logout().catch(err => console.log(err));
        this.props.getsession();
    }

dropdown() {
    if(this.state.dropdown === "shut") {
        this.setState({dropdown: "open"})
    }
    else {this.setState({dropdown: "shut"})}
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
                {this.props.auth.username ? ( 
                <div className={styles.profile}>
                <h5>{this.props.auth.name}</h5>
                <Link to="/EditProfile"><img onClick={e => this.dropdown()}height="52px" width="52px" src={this.props.auth.img}/></Link>
                <button className={styles.logout_button} onClick={e => this.logout(e)}>Logout</button></div>) : 
                (<Link to="/EditProfile"><img height="50px" width="50px" src="https://img.icons8.com/windows/64/000000/user.png"/></Link>)}
            </div>
        </nav>
        <div className={`styles.drop_${this.state.dropdown}`}>

        </div>
        </div>
    )
}
}


const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { logout, getsession })(Navbar);