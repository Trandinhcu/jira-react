import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';
import Projects from 'Projects';
import Users from 'Members';
import Profile from '../Profile/index';
import Login from 'Auth/Login';
import { isAdmin } from 'Auth/role';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/projects/:projectId" component={Project} />
      <Route path="/projects" component={Projects} />
      {
        isAdmin && <Route path="/users" component={Users} />
      }
      <Route path="/profile" component={Profile} />
      {/* <Route path="/members" component={Members} /> */}
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
