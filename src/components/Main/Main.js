import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getsession } from '../../Ducks/UserAuth';
import { connect } from 'react-redux';
import styles from '../Main/Main.module.scss';
import Axios from 'axios';


class Main extends Component{
    constructor(props) {
        super(props) 
    }


componentDidMount() {
    this.props.getsession() 
    Axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDwZxp-oMCOti6zFNJ0KUeJBO8cMi9oC28").then( res => {
        Axios.post("/api/location", {lat: res.data.location.lat, lng: res.data.location.lng }).then(res => console.log(res))
    })
}

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
                    <div className={styles.makematch}>
                    <h2>{this.props.auth.name}! <br/> We hope you enjoy a great meal <br/> and meet a great new person</h2>
                    </div>
                    <div className={styles.food_category}>
                        <div className={styles.type_1}><h5>Thai Food</h5></div>
                        <div className={styles.type_2}><h5>Burgers</h5></div>
                        <div className={styles.type_3}><h5>Asian Food</h5></div>
                        <div className={styles.type_4}><h5>Pizza Place</h5></div>
                        <div className={styles.type_5}><h5>Mexican Food</h5></div>
                        <div className={styles.type_6}><h5>Middle Eastern</h5></div>
                        <div className={styles.type_7}><h5>Italian Food</h5></div>
                    </div>
                </div>
                <section className={styles.restaurants}>
                <img src="https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"/>
                    <div><h5>Tell a corny joke, <br/> enjoy your city</h5></div>
                </section>
            </div>
                </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getsession})(Main);