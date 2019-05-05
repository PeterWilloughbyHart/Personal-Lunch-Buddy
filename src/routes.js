import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import Register from './components/RegisterUser/RegisterUser';
import Main from './components/Main/Main';
import EditProfile from './components/EditProfile/EditProfile';

export default (
    <Switch>
        <Route path='/EditProfile' component={EditProfile}/>
        <Route path='/Main' component={Main}/>
        <Route path='/Register' component={Register}/>
        <Route path='/' component={Welcome}/>
    </Switch>
)