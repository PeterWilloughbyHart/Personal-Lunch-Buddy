import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getsession } from '../../Ducks/UserAuth';
import { connect } from 'react-redux';
import styles from '../Main/Main.module.scss';
import Axios from 'axios';

const {REACT_APP_KEY} = process.env;


class Main extends Component{
    constructor(props) {
        super(props) 

        this.state = {
            buddyBox: "open"
        }
    }


componentDidMount() {
    this.props.getsession() 
    Axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_KEY}`).then( res => {
            Axios.post("/api/location", {lat: res.data.location.lat, lng: res.data.location.lng, id: this.props.auth.id }).then(res => console.log(res))
        })
}


// matchUsers(){
//     Axios.get("/auth/match")
// }

    render(){
        if(!this.props.auth.username){
            return (
                <Redirect to="/"/> // protected route, returns to welcome page if there is not a user on session
            )
        }
        return(
            <div>
            <div className={styles.main}>
                <div className={styles.makematch_space}>
                    <div className={styles.food_category}>
                        <div className={styles.type_1}><h5>Thai Food</h5></div>
                        <div className={styles.type_2}><h5>Burgers</h5></div>
                        <div className={styles.type_3}><h5>Asian Food</h5></div>
                        <div className={styles.type_4}><h5>Pizza Place</h5></div>
                        <div className={styles.type_5}><h5>Mexican Food</h5></div>
                        <div className={styles.type_6}><h5>Middle Eastern</h5></div>
                        <div className={styles.type_7}><h5>Italian Food</h5></div>
                    </div>
                    <div className={styles.buddy_match_space}>
                    <div className={styles.makematch}>
                    <h2><span>{this.props.auth.name}!</span> <br/> We hope you enjoy a great meal <br/> and meet a great new person</h2>
                    <button onClick={e => {this.state.buddyBox === "open" ? (this.setState({buddyBox: "closed"})) : this.setState({buddyBox: "open"})}}>Buddy Up!</button>
                    </div>
                    <div className={styles.buddy_box}>
                    <img src=""/>
                    <h1>User 2 Name</h1>
                    <h6>User 2 info</h6>
                    </div>
                    </div>
                </div>
            </div>
                <section className={styles.restaurants}>
                <img src="https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"/>
                    <div><h5>Tell a corny joke, <br/> enjoy your city</h5></div>
                    <h5>Stir up a conversation</h5>
                <video src="https://www.videvo.net/videvo_files/converted/2015_05/preview/FoodPack1_13_Videvo.mov72805.webm" type="video/mov" autoplay="true" loop="true"></video>
                </section>
                </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getsession})(Main);