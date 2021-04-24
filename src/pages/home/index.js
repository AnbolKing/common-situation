import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './style.less';

const Home = () => {
  return (
    <div className="home-container">
      <Link to='/hookDrag'>
        <div className="home-button">
          hookDrag
        </div>
      </Link>
      <Link to='/lightInput'>
        <div className="home-button">
          lightInput
        </div>
      </Link>
      <Link to='/infiniteScroll'>
        <div className="home-button">
          infiniteScroll
        </div>
      </Link>
      <Link to='/masonryLayout'>
        <div className="home-button">
          masonryLayout
        </div>
      </Link>
    </div>
  )
}

export default Home