import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
// Containers

//Components
import Home from '../home/Home';
import Submission from '../submissions/Submission';
import User from '../user/User';
import Submit from '../submit/Submit';
import SignIn from '../signin/SignIn';
import '../../assets/css/app.css'
import '../../assets/css/general.css'
import '../../assets/css/formStyle.css'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/submission/:id' component={Submission}/>
            <Route path='/submit' component={Submit}/> 
            <Route path='/signin' exact component={SignIn}/>
            <Route path='/user/:userID' component={User}/>

            {/*Page not found*/}
            <Route path='*' render={() =>< h3 > 404 : Not found </h3>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
