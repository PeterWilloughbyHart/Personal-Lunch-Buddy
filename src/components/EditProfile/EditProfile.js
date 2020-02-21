import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import './EditProfile.scss';
import { connect } from 'react-redux';
import { edit, getsession, login, deactivate, logout } from '../../Ducks/UserAuth';


class EditProfile extends Component{
    constructor(props){
        super(props)
        const {username, name, age, bio, email, city, state, zip, img} = this.props.auth;
        this.state = {
            username,
            name,
            age,
            bio,
            email,
            city,
            state,
            zip,
            img,
            password: ""
        }
    }

// componentDidMount() {
//     this.props.getsession().catch(err => console.log(err));
// }

edit(e) {
    e.preventDefault();
    const username = this.props.auth.username
    const {name, age, bio, email, city, state, zip, img} = this.state;
    this.props.edit(username, name, age, bio, email, city, state, zip, img)
    .then(console.log("after edit came back"));
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
    const {name, age, bio, email, city, state, zip, img} = this.props.auth;
    console.log(bio)
    
    return (
        <section id="edit_section">
            <header id="edit_hero">
                <h2>Anywhere You Are</h2>
                <h5>Let's make lunch a celebration - Find your city, <br/> Find a buddy, Find an adventure.</h5>
            </header>
            <section id="edit_inputs">
                <img alt="profile" src={img}/>
                <div>
                <input placeholder={name} onChange={(e) => this.setState({name: e.target.value})}/>
                <input placeholder={img} onChange={(e) => this.setState({img: e.target.value})}/>
                <input placeholder={age} onChange={(e) => this.setState({age: e.target.value})}/>
                <input placeholder={email} onChange={(e) => this.setState({email: e.target.value})}/>
                <input placeholder={city} onChange={(e) => this.setState({city: e.target.value})}/>
                <input placeholder={state} onChange={(e) => this.setState({state: e.target.value})}/>
                <input placeholder={zip} onChange={(e) => this.setState({zip: e.target.value})}/>
                <textarea id="" maxLength="150" placeholder={bio} onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                <button onClick={e => this.edit(e)}>Update</button>
                </div>
                <h4>please enter password for security</h4>
                <input placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/>
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