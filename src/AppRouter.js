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
import DragList from './pages/hookDrag/dragList';
import MaskTest from './pages/maskModel/test';
import UploadFile from './pages/uploadFile/index';
import LightInput from './pages/hightLight/lightInput/index';
import DOMHightLight from './pages/hightLight/lightDOM/index';
import Chat from './pages/chat/index';
import CanvasSign from './pages/canvasSign/index';
import CanvasCard from './pages/canvasSign/gua';

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
        <Route exact path='/dragList' component={DragList}/>
        <Route exact path='/maskModel' component={MaskTest}/>
        <Route exact path='/uploadFile' component={UploadFile}/>
        <Route exact path='/lightInput' component={LightInput}/>
        <Route exact path='/lightDOM' component={DOMHightLight}/>
        <Route exact path='/chat' component={Chat}/>
        <Route exact path='/canvasSign' component={CanvasSign}/>
        <Route exact path='/canvasCard' component={CanvasCard}/>
        <AnimatedSwitch>
          <Route exact path='/testLogin' component={TestLogin} />
          <Route exact path='/testuser' component={TestUser}/>
        </AnimatedSwitch>
      </Switch>
    </BrowserRouter>
  )
};

export default AppRouter;