import createStore from './configure-store';

var store = createStore({
    submissionByID: {
        isFetching: true
    },
    submissionList: {
        isFetching: true
    },
    editSubmissionByID: {},
    adminData: {
        fetching: true
    }
})

export default store;