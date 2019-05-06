import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getsession } from '../../Ducks/UserAuth';
import { connect } from 'react-redux';
import styles from '../Main/Main.module.scss';


class Main extends Component{
    constructor(props) {
        super(props) 
    }


componentDidMount() {
    this.props.getsession() 
}

    render(){
        if(!this.props.auth.username){
            return (
                <Redirect to="/"/> // protected route, returns to welcome page if there is not a user on session
            )
        }
        return(
            <div className={styles.main}>
                <div className={styles.makematch_space}>
                    <div className={styles.makematch}>
                    {/* <img src="https://dumielauxepices.net/sites/default/files/lunch-clipart-transparent-background-671319-1869768.png"/> */}
                    <h2>Welcome, {this.props.auth.name}! <br/> we hope you enjoy a great meal <br/> and meet a great new person</h2>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {getsession})(Main);