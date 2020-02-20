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
              <img src={this.state.matchData[this.state.id].img} />
              <h1>{this.state.matchData[this.state.id].name}</h1>
              <h3>Age: {this.state.matchData[this.state.id].age}</h3>
              <h3>{this.state.matchData[this.state.id].bio}</h3>
              <h4>Contact them at: <span>{this.state.matchData[this.state.id].phone}</span>!</h4>
              <img src="https://img.icons8.com/color/48/000000/phone.png" />
              <button onClick={e => this.next()}>Next Buddy</button>
              <img src="https://img.icons8.com/office/30/000000/marker.png" />
              <h4>{this.state.matchData[this.state.id].distance_in_miles}.0 Miles Away! Grab Lunch!</h4> 
            </div> 
            :
            <div id="user-card">
             <img src={this.props.auth.img} />
               <h2><span>Welcome to LunchBuddy, <br /> {this.props.auth.name}!</span></h2>
               <h3>We hope you enjoy a good meal with a new friend!</h3>
               <button id="buddy_button" onClick={e => this.matchUsers()}>Buddy Up!</button>
            </div> 
            
            }
      </section>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{ getsession })(Main);
