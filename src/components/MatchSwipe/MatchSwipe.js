import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { getsession } from "../../Ducks/UserAuth";
import { connect } from "react-redux";
import "./MatchSwipe.scss";
import MatchCard from "./MatchCard/MatchCard";
import UserCard from "./UserCard/UserCard";

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
  
  findMatches() {
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
    console.log(this.state.index);
  }

  render() {

    if(!this.props.auth.username){ return <Redirect to="/" />} 
    
    return (
      <section id="match-section">
          {this.state.matches[0] ? 
            <MatchCard state={this.state} nextMatch={() => this.nextMatch()}/>
            :
            <UserCard props={this.props} findMatches={() => this.findMatches()}/>
            
            }
      </section>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps,{ getsession })(Main);
