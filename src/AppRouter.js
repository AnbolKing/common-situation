import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import AnimatedSwitch from './utils/animation';
import Home from './pages/home/index';
import Error from './pages/error/index';
import TestLogin from './pages/routerAnimation/login/index';
import TestUser from './pages/routerAnimation/user/index';
import ImgLazy from './pages/imgLazy/index';
import MasonryLayout from './pages/masonryLayout/index';
import InfiniteScroll from './pages/infiniteScroll/index';
import HookDrag from './pages/hookDrag/test';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/error' component={Error} />
        <Route exact path='/imgLazy' component={ImgLazy}/>
        <Route exact path='/masonryLayout' component={MasonryLayout}/>
        <Route exact path='/infiniteScroll' component={InfiniteScroll}/>
        <Route exact path='/hookDrag' component={HookDrag}/>
        <AnimatedSwitch>
          <Route exact path='/testLogin' component={TestLogin} />
          <Route exact path='/testuser' component={TestUser}/>
        </AnimatedSwitch>
      </Switch>
    </BrowserRouter>
  )
};

export default AppRouter;