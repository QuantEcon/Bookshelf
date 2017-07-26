import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Containers
import SubmissionContainer from '../../containers/submission/SubmissionContainer';
import UserContainer from '../../containers/user/UserContainer'
//Components
import Home from '../home/Home';
import {AuthGlobals} from 'redux-auth/default-theme';
// import Submission from '../submissions/Submission';
import Submit from '../submit/Submit';
import SignIn from '../signin/SignIn';
import '../../assets/css/app.css'
import '../../assets/css/general.css'
import '../../assets/css/formStyle.css'

class App extends Component {

  render() {
    return (
      <div>
        <AuthGlobals/>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/submission/:id' component={SubmissionContainer}/>
              <Route path='/submit' component={Submit}/> 
              <Route path='/signin' exact component={SignIn}/>
              <Route path='/user/:userID' component={UserContainer}/>

              {/*Page not found*/}
              <Route path='*' render={() =>< h3 > 404 : Not found </h3>}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
