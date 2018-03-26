import React , { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header';
import './style.css';

class Home extends Component {
  render() {
    return(
      <div id="homepage" className="content">
        <Header />
        <section className="intro">
          <div className="overlay overlay-blue"></div>
          <div className="container d-flex align-items-end">
            <div className="content-intro text-center text-md-left">
              <h1 className="headline text-white">Cara Termudah Membeli Bitcoin dan Ethereum</h1>
              <h5 className="sub-headline text-white font-weight-normal">Toko Crypto adalah tempat yang aman dan mudah untuk membeli mata uang digital seperti Bitcoin dan Ethereum</h5>
              <Link to="/trade" className="btn btn-lg btn-yellow btn-blue-hover btn-shadow mb-3 mt-3">Pelajari</Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Home;
