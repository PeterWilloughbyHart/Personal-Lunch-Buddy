import React from "react";

const UserCard = ({props, findMatches}) => {
    return (
        <div id="user-card">
        <img src={props.auth.img} />
        <h2>Welcome to LunchBuddy, <br /> <span>{props.auth.name}</span>!</h2>
        <h3>We wish you a nice meal and a new friend!</h3>
        <button id="buddy_button" onClick={e => findMatches()}>Buddy Up!</button>
      </div> 
    )
}

export default UserCard;