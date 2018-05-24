import React, {Component} from 'react';
// import UserPreview from '../user/UserPreview'
import Modal from 'react-modal'
import UserPreview from '../user/UserPreview';

class AddAdminModal extends Component {
    constructor(props){
        super(props)

        this.search = this.search.bind(this)
        this.searchChanged = this.searchChanged.bind(this)
        this.makeAdminClicked = this.makeAdminClicked.bind(this)
    }

    componentWillReceiveProps(props){
        console.log("[AddAdminModal] - will receive props: ", props)
    }

    search = (e) => {
        if(e){
            e.preventDefault()
            this.props.onSearch(this.state.searchWords)
        }
    }

    searchChanged = (e) => {
        if(e) {
            e.preventDefault()
            this.setState({searchWords: e.target.value})
        }
    }

    makeAdminClicked = (userID) => {
        this.props.makeAdmin(userID)
    }

    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen}
                contentLabel="Add Admin"
                className="overlay">
                <div className="my-modal">

                    <div className="modal-header">
                        <h1 className="modal-title">Add Admin</h1>
                    </div>

                    <div className="modal-body">
                        {/* Searchbar */}
                        <div>
                            <form name="searchForm" onSubmit={this.search}>
                                <input type="text"
                                    onChange={this.searchChanged}
                                    placeholder="Search by email, name, or username"
                                    onSubmit={this.searchButtonClicked}
                                    autoFocus/>
                            </form>
                        </div>
                        {/* List of users */}
                        {this.props.searchResults
                        ? <div className='summaries'>
                            {this.props.searchResults.users.map((user, index) => {
                                return <div key={index}>
                                    <UserPreview user={user}/>
                                    <ul className="admin-button-row">
                                        <li>
                                            <button onClick={() => this.makeAdminClicked(user._id)}>Make Admin</button>
                                        </li>
                                    </ul>
                                </div>
                            })}
                        </div>
                        : null}
                    </div>

                    <ul className="button-row">
                        <li>
                            <button onClick={this.props.onCancel} className="alt">Cancel</button>
                        </li>
                    </ul>
                </div>
            </Modal>
        )
    }
}

export default AddAdminModal