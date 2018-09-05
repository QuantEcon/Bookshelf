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
    return (
        <Route
            {...rest}
            render={(props) => state.auth.isSignedIn === true || fromAPI || state.auth.loading
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