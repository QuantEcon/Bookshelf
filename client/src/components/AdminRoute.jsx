import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import store from '../store/store'
import {getParamByName} from '../utils/url';
import TempComponent from './TempComponent';

export default function AdminRoute({
    component: Component,
    ...rest
}) {
    const state = store.getState();
    const fromAPI = getParamByName('fromAPI', window.location.href);
    return (
        <Route
            {...rest}
            // TODO: Check with server instead of local check
            render={(props) => state.auth.isSignedIn === true && state.auth.userIsAdmin === true
            ? <div>            
                {fromAPI 
                ? <TempComponent/>
                :<Component {...props}/>}
            </div>
            : <Redirect
                to={{
                pathname: '/',
                state: {
                    from: props.location
                }
            }}/>}/>
    )
}