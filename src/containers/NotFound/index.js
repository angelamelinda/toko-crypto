import React , { Component } from 'react';
import Header from '../../components/header';

class Home extends Component {
  render() {
    return(
      <div id="not-found" className="content">
        <Header/>
        <div className="text-center">Page Not Found</div>
      </div>
    )
  }
}

export default Home;
