import React from 'react';
import { Router,Route, Switch, Link, NavLink } from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
const createHistory = require("history").createBrowserHistory;
export const history = createHistory();
import PrivateRoute from './PrivateRoute';
import RegisterUserPage from '../components/RegisterUserPage';

const AppRouter = () => (
   <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/register" component={RegisterUserPage} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
