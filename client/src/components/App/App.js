import React, { Component } from 'react';

import Head from "../partials/Head";
import SubmissionList from "../submissions/SubmissionList"

import '../../assets/css/app.css'
import '../../assets/css/general.css'

class App extends Component {
  
  render() {
    return (
      <div>
        <Head/>
        {/* get submissions */}
        <SubmissionList/>
      </div>

    );
  }
}

export default App;
