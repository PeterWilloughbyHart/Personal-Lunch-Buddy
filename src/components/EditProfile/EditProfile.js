import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import './EditProfile.scss';
import { connect } from 'react-redux';
import { edit, getsession, login, deactivate, logout } from '../../Ducks/UserAuth';


class EditProfile extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: "",
            name: "",
            age: "",
            bio: "",
            email: "",
            city: "",
            state: "",
            zip: "",
            img: "",
            password: ""
        }
    }

componentDidMount() {
    this.props.getsession().catch(err => console.log(err));
}

edit(e) {
    e.preventDefault();
    const session = this.props.auth.username;
    const {username, name, age, bio, email, city, state, zip, img, password} = this.state;
    this.props.edit(session, username, name, age, bio, email, city, state, zip, img)
    .then(this.props.login(username, password));
}

deactivate(e) {
    // console.log('deactivate in editprofile')
    e.preventDefault();
    // console.log(this.props.auth.username, this.state.password)
    this.props.deactivate(this.props.auth.username)
    .then( this.props.logout().catch(err =>  console.log(err)));
}


render() {
    if(!this.props.auth.username){ return <Redirect to="/"/> }
    const {username, name, age, bio, email, city, state, zip, img} = this.props.auth;
    
    return (
        <section id="edit_section">
            <header id="edit_hero">
                <h2>Anywhere You Are</h2>
                <h5>Let's make lunch a celebration - Find your city, <br/> Find a buddy, Find an adventure.</h5>
            </header>
            <section id="edit_inputs">
                <img src={img}/>
                <div>
                <input placeholder={username} onChange={(e) => this.setState({username: e.target.value})}></input>
                <input placeholder={name} onChange={(e) => this.setState({name: e.target.value})}></input>
                <input placeholder="image url" onChange={(e) => this.setState({img: e.target.value})}></input>
                <input placeholder={age} onChange={(e) => this.setState({age: e.target.value})}></input>
                <input placeholder={email} onChange={(e) => this.setState({email: e.target.value})}></input>
                <input placeholder={city} onChange={(e) => this.setState({city: e.target.value})}></input>
                <input placeholder={state} onChange={(e) => this.setState({state: e.target.value})}></input>
                <input placeholder={zip} onChange={(e) => this.setState({zip: e.target.value})}></input>
                <textarea id="" maxlength="150" placeholder={bio} onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                <h4>please enter password for security</h4>
                <input placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/>
                <button onClick={e => this.edit(e)}>Update</button>
                </div>
            </section>
            <section id="deactivate_account">
                <button onClick={e => this.deactivate(e)}>Deactivate</button>
            </section>
        </section>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { edit, getsession, login, deactivate, logout })(EditProfile);