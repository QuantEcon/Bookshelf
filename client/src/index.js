import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from 'react-redux'
import store from './store/store';
// import {configure} from 'redux-auth'

// //set up store for redux-auth store     .dispatch(configure([         {
//       default: {                 apiUrl: 'http://localhost:8080/api',
//         authProviderPaths: {                     github: '/auth/github/',
//                 twitter: '/auth/twitter',                     fb: '/auth/fb',
//                     google: '/auth/google'                 },
// tokenValidationPath: '/auth/validate-token'             }         }     ]))
//   .then(({redirectPath, blank} = {}) => {         if (blank) {
// ReactDOM.render(                 <noscript/>,
// document.getElementById('root'))         } else {
// ReactDOM.render(                 <Provider store={store}>
// <App/>             </Provider>, document.getElementById('root'));         }
//   });
ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
