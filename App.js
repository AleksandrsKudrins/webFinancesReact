import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersList from './UsersList';
import UsersEdit from './UsersEdit';
import OrdersList from './OrdersList';

class App extends Component {
  render() {
  return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/users' exact={true} component={UsersList}/>
          <Route path='/users/:id/orders' exact={true} component={OrdersList}/>
		  <Route path='/users/:id' component={UsersEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
