import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import store from '../store/store'

export default function PrivateRoute({
    component: Component,
    ...rest
}) {
    const state = store.getState();
    console.log('In protected route: ', state.auth.isSignedIn);
    return (
        <Route
            {...rest}
            render={(props) => state.auth.isSignedIn === true
            ? <Component {...props}/>
            : <Redirect
                to={{
                pathname: '/signin',
                state: {
                    from: props.location
                }
            }}/>}/>
    )
}