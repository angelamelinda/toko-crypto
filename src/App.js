import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';

import Home from './containers/Homepage';
import CurrencyPage from './containers/Currencies';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Header from './components/Header';

class App extends Component {
  componentDidMount() {
        Promise.resolve()
        .then(() => {
            this.setState({ loaded: true })
        }, (err) => {
            console.log('An error occurred (but not in setState!)', err);
        });
    }
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Header/>
            <Switch>
              <Route path='/' component={Home} exact/>
              <Route path='/currencies' component={CurrencyPage} exact/>
              <Route path='/login' component={Login} exact/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
