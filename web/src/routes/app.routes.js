import React from 'react';
import { Route, Switch } from 'react-router-dom'

import User from '../pages/User';
import RegisterUser from '../pages/RegisterUser';
import EditUser from '../pages/EditUser';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path='/' component={User} />
      <Route path='/registeruser' component={RegisterUser} />
      <Route path='/edituser' component={EditUser} />
    </Switch>
  );
}

export default AppRoutes;