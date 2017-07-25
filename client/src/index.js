import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {Provider} from 'react-redux'
import configureStore from './store/configure-store';

const store = configureStore({submissionByID: {isFetching: true}, submissionList: {isFetching: true}});

ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));