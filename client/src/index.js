import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';
import {configure} from 'redux-auth'

const store = configureStore({
    submissionByID: {
        isFetching: true
    },
    submissionList: {
        isFetching: true
    }
});

//set up store for redux-auth
store
    .dispatch(configure([
        {
            default: {
                apiUrl: 'http://localhost:8080/api/auth',
                authProviderPaths: {
                    github: '/github/',
                    twitter: '/twitter',
                    fb: '/fb',
                    google: '/google'
                }
            }
        }
    ]))
    .then(({redirectPath, blank} = {}) => {
        if (blank) {
            ReactDOM.render(
                <noscript/>, document.getElementById('root'))
        } else {
            ReactDOM.render(
                <Provider store={store}>
                <App/>
            </Provider>, document.getElementById('root'));
        }
    });
