import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Containers
import SubmissionContainer from '../../containers/submission/SubmissionContainer';
import UserContainer from '../../containers/user/UserContainer'
import MyProfileContainer from '../../containers/user/MyProfileContainer'
import SubmitContainer from '../../containers/SubmitContainer'
import PreviewContainer from '../../containers/PreviewContainer'
//Components
import Home from '../home/Home';
import ProtectedRoute from '../ProtectedRoute';
import SignIn from '../signin/SignIn';
import '../../assets/css/app.css'
import '../../assets/css/general.css'
import '../../assets/css/formStyle.css'

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/submission/:id' component={SubmissionContainer}/>
              <ProtectedRoute exact path='/submit/preview' component={PreviewContainer}/>
              <ProtectedRoute path='/submit' component={SubmitContainer}/>
              <Route path='/signin' exact component={SignIn}/>
              <ProtectedRoute exact path='/user/my-profile' component={MyProfileContainer}/>
              <Route path='/user/:userID' component={UserContainer}/> {/*Page not found*/}
              <Route path='*' render={() =>< h3 > 404 : Not found </h3>}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
