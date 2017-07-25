import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';

/*
{
    submissionByID: {
        *submissionID*: {
            isFetching: Boolean,
            didInvalidate: Boolean,
            lastUpdated: Date,
            data: {}
        },
        ...
    }
    submissionList: {
        isFetching: Boolean,
        didInvalidate: Boolean,
        lastUpdated: Date,
        previews: [],
        authors: []
    }
}
*/

import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';

const enhancers = compose(applyMiddleware(thunkMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)

export default (initialState) => {
    return createStore(rootReducer, initialState, enhancers);
}