export const BEGIN_SUBMIT = 'BEGIN_SUBMIT'
export const beginSubmit = () => {
    return {type: BEGIN_SUBMIT}
}

export const END_SUBMIT = 'END_SUBMIT'
export const endSubmit = (error) => {
    return {type: END_SUBMIT, error}
}

export const submit = (formData, file) => {
    return function (dispatch) {
        console.log('[SubmitActions] - submit: ', formData, file);

        //TODO: implement API endpoints for submission
        // dispatch(beginSubmit());
        // fetch('/api/submit', {
        //     method: 'POST',
        //     body: {
        //         formData,
        //         file
        //     }
        // }).then(resp => {
        //     return resp.json();
        // }, error => {
        //     console.log('[SubmitAction] - error submitting:', error)
        //     dispatch(endSubmit({message: error}))
        // }).then(response => {
        //     console.log('[SubmitAction] - successfully submitted: ', response);
        //     dispatch(endSubmit());
        // })
    }
}