import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';

import Home from './containers/Homepage';
import CurrencyPage from './containers/Currencies';
import BalancePage from './containers/Balance';
import NotFound from './containers/NotFound';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Header/>
            <Switch>
              <Route path='/' component={Home} exact/>
              <Route path='/currencies' component={CurrencyPage} exact/>
              <Route path='/balance' component={BalancePage} exact/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
