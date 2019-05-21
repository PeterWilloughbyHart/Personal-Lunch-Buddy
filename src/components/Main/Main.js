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
            buddyBox: "open",
            matchName: "",
            matchEmail: "",
            matchImg: "",
            matchDistance: "",
            matchData: [],
            id: 0
        }
    }


componentDidMount() {
    this.props.getsession() 
    // Axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${REACT_APP_KEY}`).then( res => {
    //         Axios.put("/api/location", {lat: res.data.location.lat, lng: res.data.location.lng, id: this.props.auth.id }).then(res => console.log(res))
    //     })
}


matchUsers(){
    Axios.get("/auth/getmatch").then(res => {
        this.setState({matchData: res.data.pairedBuddy})
        console.log(this.state.matchData)
    })
}

next() {
    this.setState({ id: (this.state.id + 1) % this.state.matchData.length });
    }

    render(){
        if(!this.props.auth.username){
            return (
                <Redirect to="/"/> // protected route, returns to welcome page if there is not a user on session
            )
        }
        // let {matchData, id} = this.state
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
                        {/* <div className={styles.type_6}><h5>Middle Eastern</h5></div> */}
                        <div className={styles.type_7}><h5>Italian Food</h5></div>
                    </div>
                    <div className={styles.buddy_match_space}>
                    <div className={styles.makematch}>
                    <img src={this.props.auth.img}/>
                    <div>
                    <h2><span>Welcome to LunchBuddy, {this.props.auth.name}!</span> <br/> We hope you enjoy a good meal <br/> and meet a great new person in {this.props.auth.city}!</h2>
                    <button onClick={(e) => this.matchUsers()}>Buddy Up!</button>
                    <h4><img src="https://img.icons8.com/office/30/000000/marker.png"/>{this.props.auth.city}</h4>
                    </div>
                    </div>
                    <div className={styles.buddy_box}>
                    {this.state.matchData[0] ? (<img src={this.state.matchData[this.state.id].img}/>) : null}
                    <div>
                    {this.state.matchData[0] ? (<h1>{this.state.matchData[this.state.id].name}</h1>) : <h1>Click Buddy Up!</h1>}
                    {this.state.matchData[0] ? (<h3>Age: {this.state.matchData[this.state.id].age}</h3>) : null}
                    {this.state.matchData[0] ? (<h3>{this.state.matchData[this.state.id].bio}</h3>) : null}
                    {this.state.matchData[0] ? (<h4>Contact them at <img src="https://img.icons8.com/color/48/000000/phone.png"/> <span>{this.state.matchData[this.state.id].phone}</span>!</h4>) : null}
                    {this.state.matchData[0] ? (<button onClick={e => this.next()}>Next Buddy</button>) : null}
                    {this.state.matchData[0] ? (<h4><img src="https://img.icons8.com/office/30/000000/marker.png"/>{this.state.matchData[this.state.id].distance_in_miles}.0 Miles Away! Grab Lunch!</h4>) : null}
                    </div>
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