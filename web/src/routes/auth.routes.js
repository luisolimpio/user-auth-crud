import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';

function AuthRoutes() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  );
}

export default AuthRoutes;