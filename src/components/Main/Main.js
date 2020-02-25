import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { getsession } from "../../Ducks/UserAuth";
import { connect } from "react-redux";
import "./Main.scss";

const { REACT_APP_KEY } = process.env;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],
      index: 0
    };
  }

  componentDidMount() {
    this.props.getsession().then(res => console.log(res.value.data));
  }
  
  findUsers() {
    Axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_KEY}`)
    .then( res => {
    Axios.put("/api/location", {lat: res.data.location.lat, lng: res.data.location.lng, id: this.props.auth.id })
    })
    .then(res => {
    Axios.get("/auth/getmatch").then(res => this.setState({ matches: res.data.matchResults }));
    })
  }
  
  nextMatch() {
    this.setState({ index: (this.state.index + 1) % this.state.matches.length });
  }

  render() {

    if(!this.props.auth.username){ return <Redirect to="/" />} 
    
    return (
      <section id="match-section">
          {this.state.matches[0] ? 
      
      <div id="match-card">
              <img id="match_profile" alt="match profile" src={this.state.matches[this.state.index].img} />
              <h2 id="match_name">{this.state.matches[this.state.index].name}</h2>
              <h3 id="match_age">Age: {this.state.matches[this.state.index].age}</h3>
              <h3 id="match_bio">Bio: {this.state.matches[this.state.index].bio}</h3>
              <img id="phone_icon" alt="phone" src="https://img.icons8.com/color/48/000000/phone.png" />
              <h4 id="match_contact">Contact them at: <span>{this.state.matches[this.state.index].phone}!</span></h4>
              <img id="marker_icon" alt="marker" src="https://img.icons8.com/office/30/000000/marker.png" />
              <h4 id="match_distance"><span>{this.state.matches[this.state.index].distance_in_miles}.0</span> Miles Away! Grab Lunch!</h4> 
              <button onClick={e => this.nextMatch()}>Next Buddy</button>
            </div> 
            :
            <div id="user-card">
              <img src={this.props.auth.img} />
              <h2>Welcome to LunchBuddy, <br /> <span>{this.props.auth.name}</span>!</h2>
              <h3>We wish you a nice meal and a new friend!</h3>
              <button id="buddy_button" onClick={e => this.findUsers()}>Buddy Up!</button>
            </div> 
            
            }
      </section>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{ getsession })(Main);
