import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {reauthenticate} from '../../actions/auth/signIn'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// Containers
import SubmissionContainer from '../../containers/submission/SubmissionContainer';
import UserContainer from '../../containers/user/UserContainer'
import MyProfileContainer from '../../containers/user/MyProfileContainer'
import SubmitContainer from '../../containers/SubmitContainer'
import PreviewContainer from '../../containers/PreviewContainer'
import EditProfileContainer from '../../containers/user/EditProfileContainer'
import EditSubmissionContainer from '../../containers/submission/EditSubmissionContainer';
import AdminContainer from '../../containers/admin/AdminContainer'
import Contact from '../Contact'
//Components
import Home from '../home/Home';
import ProtectedRoute from '../ProtectedRoute';
import SignIn from '../signin/SignIn';
import FAQ from '../FAQ';
import About from '../About';
import TempComponent from '../TempComponent'
import NotFound from '../NotFound'

import '../../assets/css/main.css'
//import '../../assets/css/app.css'
//import '../../assets/css/general.css'
//import '../../assets/css/formStyle.css'
//import '../../assets/css/modal.css'

class App extends Component {

  constructor(props){
    super(props);

    console.log("props: ", props)
    props.actions.reauthenticate(window.location.href);

    this.showConfirm = this
        .showConfirm
        .bind(this);
  }

  showConfirm(){
    console.log("I am conforming the route")
  }

  render() {
    return (
      <div>
        <BrowserRouter>
            <div>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/faq' component={FAQ}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/about' component={About}/>
                <Route path='/submission/:id' component={SubmissionContainer}/>
                <ProtectedRoute exact path='/edit-submission/:id' component={EditSubmissionContainer}/>
                <ProtectedRoute exact path='/submit/preview' component={PreviewContainer}/>
                <ProtectedRoute path='/submit' onLeave={ this.showConfirm } component={SubmitContainer}/>
                <Route path='/signin' exact component={SignIn}/>
                <ProtectedRoute exact path='/user/my-profile/edit' component={EditProfileContainer}/>
                <ProtectedRoute exact path='/user/my-profile' component={MyProfileContainer}/>
                <Route exact path='/temp' component={TempComponent}/>
                <Route path='/admin' exact component={AdminContainer}/>
                <Route path='/user/:userID' component={UserContainer}/>
                <Route path='*' component={NotFound}/>
              </Switch>
            </div>
          </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({reauthenticate}, dispatch)
  }
}

const mapStateToProps = (state, props) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isLoading: state.auth.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
