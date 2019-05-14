import React, {Component} from 'react';
// import styles from './Navbar.module.scss';
import './Navbar.scss'
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

// componentDidMount(){
//     this.props.getsession();
// }

logout(e) {
        e.preventDefault(); // prevents the element action of an element from happening. ex. prevents a link from following the URL, submit from submitting a form

        this.props.logout()
        .then(this.props.getsession)
        .then(window.location.reload())
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
        <nav className="welcome">
            <div className="logo">
                <Link to="/Main"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKO7N15yCr44wAfgwGZd5A84h4wAUGsL1BtidAaA4UyjOemPLPVw"/></Link>
                <h1>LunchBuddy</h1> 
            </div>
            <div className="profile">
                {this.props.auth.username ? ( 
                <div className="profile">
                <h5>{this.props.auth.name}</h5>
                <img onClick={e => this.dropdown()} height="58px" width="58px" src={this.props.auth.img}/>
                <button className="logout_button" onClick={e => this.logout(e)}>Logout</button></div>) : 
                (<img onClick={e => this.dropdown()} height="54px" width="54px" src="https://img.icons8.com/windows/64/000000/user.png"/>)}
            </div>
        </nav>
        <div className={`drop${this.state.dropdown}`}>
        <ul>
            <Link to="/EditProfile"><li>Edit Profile</li></Link>
            <li onClick={(e) => this.logout(e)}>Logout</li>
            <li>About</li>
        </ul>
        </div>
        </div>
    )
}
}


const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, { logout, getsession })(Navbar);