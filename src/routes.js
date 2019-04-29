import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Welcome from './components/welcome/Welcome';

export default (
    <Switch>
        {/* <Route path='/' component={}/> */}
        {/* <Route path='/' component={}/> */}
        {/* <Route path='/' component={}/> */}
        <Route path='/' component={Welcome}/>
    </Switch>
)