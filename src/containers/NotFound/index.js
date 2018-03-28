import React from 'react';

const Home = (props) => {
  return(
    <div id="not-found">
      <div className="content">
        <div className="container d-flex align-items-center justify-content-center pt-4 pb-4">
          <div className="text-center">
            <h1>404</h1>
            <h3>oops, sorry we can't find that page!</h3>
            <p>Either something went wrong or the page doesn't exist anymore.</p>
            <a className="btn btn-lg btn-yellow btn-blue-hover btn-shadow mb-3 mt-3" href="/">Kembali ke depan</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
