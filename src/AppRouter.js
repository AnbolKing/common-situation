import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Error from './pages/error/index';
import TestLogin from './pages/test/login/index';
import TestUser from './pages/test/user/index';
import AnimatedSwitch from './utils/animation';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AnimatedSwitch>
          <Route exact path='/testLogin' component={TestLogin} />
          <Route exact path='/testuser' component={TestUser}/>
        </AnimatedSwitch>
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  )
};

export default AppRouter;