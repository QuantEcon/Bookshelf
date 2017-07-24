import rootReducer from '../reducers';

import {createStore, compose} from 'redux'

const enhancers = compose(window.devToolsExtension
    ? window.devToolsExtension()
    : f => f)

export default (initialState) => {
    return createStore(rootReducer, initialState, enhancers);
}