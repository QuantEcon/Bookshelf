import createStore from './configure-store';

var store = createStore({
    submissionByID: {
        isFetching: true
    },
    submissionList: {
        isFetching: true
    },
    editSubmissionByID: {}
})

export default store;