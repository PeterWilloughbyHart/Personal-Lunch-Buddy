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
        <nav>
            <section className="welcome">
                <div className="logo">
                    <Link to="/Main"><img src="https://img.icons8.com/color/48/000000/lunchbox.png"/></Link>
                    <h1>LunchBuddy</h1> 
                </div>
                <div className="profile">
                    {this.props.auth.username ? ( 
                    <div className="profile">
                    <h5>{this.props.auth.name}</h5>
                    <img id="profile-button" onClick={e => this.dropdown()} height="58px" width="58px" src={this.props.auth.img}/>
                    <img id="settings" onClick={e => this.dropdown()} src="https://img.icons8.com/material-rounded/24/000000/settings.png"/>
                    <button className="logout_button" onClick={e => this.logout(e)}>Logout</button></div>) : 
                    (<img onClick={e => this.dropdown()} height="54px" width="54px" src="https://img.icons8.com/windows/64/000000/user.png"/>)}
                </div>
            </section>
            <div className={`drop${this.state.dropdown}`}>
                <ul>
                    <Link to="/EditProfile"><li onClick={e => this.dropdown()}>Edit Profile</li></Link>
                    <Link to="/Main"><li onClick={e => this.dropdown()}>Match With a Buddy</li></Link>
                    <li onClick={(e) => this.logout(e)}>Logout</li>
                    <li onClick={e => this.dropdown()}>Nevermind</li>
                </ul>
            </div>
        </nav>
    )
}
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { logout, getsession })(Navbar);