import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Home from './pages/home/index';
import Error from './pages/error/index';
import TestLogin from './pages/routerAnimation/login/index';
import TestUser from './pages/routerAnimation/user/index';
import ImgLazy from './pages/imgLazy/index';
import AnimatedSwitch from './utils/animation';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/error' component={Error} />
        <Route exact path='/imgLazy' component={ImgLazy}/>
        <AnimatedSwitch>
          <Route exact path='/testLogin' component={TestLogin} />
          <Route exact path='/testuser' component={TestUser}/>
        </AnimatedSwitch>
      </Switch>
    </BrowserRouter>
  )
};

export default AppRouter;