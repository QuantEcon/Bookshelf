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
    },
    auth: {
        loading: true
    }
})

export default store;