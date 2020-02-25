import React from "react";

const MatchCard = ({state, nextMatch}) => {
    return (
        <div id="match-card">
              <img id="match_profile" alt="match profile" src={state.matches[state.index].img} />
              <h2 id="match_name">{state.matches[state.index].name}</h2>
              <h3 id="match_age">Age: {state.matches[state.index].age}</h3>
              <h3 id="match_bio">Bio: {state.matches[state.index].bio}</h3>
              <img id="phone_icon" alt="phone" src="https://img.icons8.com/color/48/000000/phone.png" />
              <h4 id="match_contact">Contact them at: <span>{state.matches[state.index].phone}!</span></h4>
              <img id="marker_icon" alt="marker" src="https://img.icons8.com/office/30/000000/marker.png" />
              <h4 id="match_distance"><span>{state.matches[state.index].distance_in_miles.toFixed(1)}</span> Miles Away! Grab Lunch!</h4> 
              <button onClick={e => nextMatch()}>Next Buddy</button>
        </div> 
    )
}

export default MatchCard;