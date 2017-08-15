import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import store from '../store/store'
import {getParamByName} from '../utils/url';
import TempComponent from './TempComponent';

export default function PrivateRoute({
    component: Component,
    ...rest
}) {
    const state = store.getState();
    const fromAPI = getParamByName('fromAPI', window.location.href);
    console.log('window.location.href:', window.location.href);
    console.log('From api: ', fromAPI);
    console.log('In protected route: ', state.auth.isSignedIn);
    return (
        <Route
            {...rest}
            render={(props) => state.auth.isSignedIn === true || fromAPI
            ? <div>            
                {fromAPI 
                ? <TempComponent/>
                :<Component {...props}/>}
            </div>
            : <Redirect
                to={{
                pathname: '/signin',
                state: {
                    from: props.location
                }
            }}/>}/>
    )
}