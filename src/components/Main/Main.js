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
      buddyBox: "open",
      matchName: "",
      matchEmail: "",
      matchImg: "",
      matchDistance: "",
      matchData: [],
      id: 0
    };
  }

  componentDidMount() {
    this.props.getsession();
    // Axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_KEY}`).then( res => {
    //         Axios.put("/api/location", {lat: res.data.location.lat, lng: res.data.location.lng, id: this.props.auth.id }).then(res => console.log(res))
    //     })
  }

  matchUsers() {
    Axios.get("/auth/getmatch").then(res => this.setState({ matchData: res.data.pairedBuddy }));
  }

  next() {
    this.setState({ id: (this.state.id + 1) % this.state.matchData.length });
  }

  render() {

    if(!this.props.auth.username){ return <Redirect to="/" />} 

    return (
      <section id="match-section">
          {this.state.matchData[0] ? 
      
            <div id="match-card">
              <img id="match_profile" alt="match profile" src={this.state.matchData[this.state.id].img} />
              <h2 id="match_name">{this.state.matchData[this.state.id].name}</h2>
              <h3 id="match_age">Age: {this.state.matchData[this.state.id].age}</h3>
              <h3 id="match_bio">Bio: {this.state.matchData[this.state.id].bio}</h3>
              <img id="phone_icon" alt="phone" src="https://img.icons8.com/color/48/000000/phone.png" />
              <h4 id="match_contact">Contact them at: <span>{this.state.matchData[this.state.id].phone}!</span></h4>
              <img id="marker_icon" alt="marker" src="https://img.icons8.com/office/30/000000/marker.png" />
              <h4 id="match_distance"><span>{this.state.matchData[this.state.id].distance_in_miles}.0</span> Miles Away! Grab Lunch!</h4> 
              <button onClick={e => this.next()}>Next Buddy</button>
            </div> 
            :
            <div id="user-card">
             <img src={this.props.auth.img} />
               <h2>Welcome to LunchBuddy, <br /> <span>{this.props.auth.name}</span>!</h2>
               <h3>We wish you a nice meal and a new friend!</h3>
               <button id="buddy_button" onClick={e => this.matchUsers()}>Buddy Up!</button>
            </div> 
            
            }
      </section>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{ getsession })(Main);
