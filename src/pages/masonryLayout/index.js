import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { get } from '../../utils/require';
import './style.less';

const MasonryLayout = () => {
  const colNum = useRef(0);
  const prev = useRef(null);
  const colHeight = useRef([]);
  const page = useRef(0);
  const [allImg, setAllImg] = useState([]);
  const handleGetImg = async () => {
    let imgsArr = [];
    let res = await get('https://api.thecatapi.com/v1/images/search', {
      params: {
        size: 'full',
        limit: 10,
        page: page.current+1,
      }
    })
    let data = res.data;
    data.forEach(item => {
      let obj = {
        url: item.url,
        id: item.id,
        width: item.width,
        height: 200*item.width/item.height,
        top: 0,
        left: 0,
      }
      imgsArr.push(obj)
    })
    return imgsArr;
  }
  const handleComputeColHeight = imgsArr => {
    imgsArr.forEach(item => {
      let idx = 0;
      let minHeight = colHeight.current[0];
      for(let i=0; i<colHeight.current.length; i++) {
        if(minHeight > colHeight.current[i]) {
          minHeight = colHeight.current[i];
          idx = i;
        }
      }
      item.left = 200 * idx;
      item.top = minHeight;
      colHeight.current[idx] += item.height;
    })
  }
  const handleInitGetImgs = async () => {
    let imgsArr = await handleGetImg();
    let screenWidth = document.querySelector('body').offsetWidth;
    colNum.current = Math.floor(screenWidth/200);
    colHeight.current = new Array(colNum.current).fill(0)
    handleComputeColHeight(imgsArr);
    setAllImg([...allImg, ...imgsArr])
  }
  const handleLoadMore = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if(scrollTop+clientHeight+100 > scrollHeight) {
      let data = await handleGetImg();
      handleComputeColHeight(data);
      console.log(data);
      setAllImg([...allImg, ...data])
    //  handleCreateImg(data)  
    }
  }
  const handleRender = () => {
    return allImg.map(item => {
      console.log('ok');
      return (
        <div 
          className="img-box" 
          key={item.id}
          style={{height:item.height+'px',left:item.left+'px',top:item.top+'px'}}
        >
          <img src={item.url} alt={item.id} key={item.id} className="img-item"/>
        </div>
      )
    })
  }
  const throttle = (fn, delay) => {
    prev.current = Date.now();
    return (...rest) => {
      let context = this;
      let args = rest;
      let now = Date.now();
      if(now-prev.current >= delay) {
        fn.apply(context, args);
        prev.current = Date.now();
      }
    }
  }
  const handleResize = () => {
    window.location.reload();
  }
  useEffect(() => {
    window.addEventListener('load', handleInitGetImgs, true)
  });
  useEffect(() => {
    window.addEventListener('scroll', throttle(handleLoadMore, 50), true)
  })
  useEffect(() => {
    window.addEventListener('resize', handleResize, true);
  })
  return (
    <div className="container">
      <div className="header">
        头部
      </div>
      <div className="body">
        <div className="main-container">
          {
            handleRender()
          }
        </div>
      </div>
    </div>
  )
}

export default MasonryLayout;