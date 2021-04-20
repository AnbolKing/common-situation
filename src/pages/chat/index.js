import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import './style.less';

const Chat = () => {
  // eslint-disable-next-line
  const [users, setUsers] = useState(0);
  // eslint-disable-next-line
  const [list, setList] = useState([]);
  // eslint-disable-next-line
  const [userId, setUserId] = useState(new Date().getTime());
  const [content, setContent] = useState('');
  const chatBody = useRef(null);
  const inputRef = useRef(null);
  const chatList = useRef([]);
  const timer = useRef(null);
  const ws = useRef(null);
  const handleRenderMsg = () => {
    return list.map((item, index) => {
      let chatStyle = {
        flexDirection: item.userId===userId ? 'row-reverse' : '',
      }
      let headStyle = {
        background: `hsl(${getUserHead(item.userId,'bck')}, 88%, 62%)`,
        clipPath: `polygon(${getUserHead(item.userId,'polygon')}% 0,100% 100%,0% 100%)`,
        transform: `rotate(${getUserHead(item.userId,'rotate')}deg)`
      }
      let msgStyle = {
        float: item.userId===userId ? 'right' : '',
      }
      return (
        <div 
          className='chat-msg' 
          key={index}
          style={chatStyle}
        >
          <div className="user-head">
            <div
              className="head"
              style={headStyle}
            ></div>
          </div>
          <div className="user-msg">
            <span
              style={msgStyle}
              className={item.userId===userId ? 'right' : 'left'}
            >
              {item.content}
            </span>
          </div>
        </div>
      )
    })
  }
  const getUserHead = (id, type) => {
    let ID = String(id);
    if(type === 'bck') {
      return Number(ID.substring(ID.length - 3));
    }
    if (type === "polygon") {
      return Number(ID.substring(ID.length - 2));
    }
    if (type === "rotate") {
      return Number(ID.substring(ID.length - 3));
    }
  }
  const debounce = (fn, delay) => {
    timer.current = null;
    return (...rest) => {
      let self = this;
      let args = rest;
      if(timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn.apply(self, args);
      }, delay)
    }
  }
  const handleChange = (e) => {
    setContent(e.target.value);
  }
  const scrollBottom = () => {
    let el = chatBody.current;
    el.scrollTop = el.scrollHeight;
  }
  const handleSendText = () => {
    inputRef.current.focus();
    if(!content) {
      return ;
    }
    let params = {
      userId: userId,
      msg: content,
    };
    console.log(params);
    ws.current.send(JSON.stringify(params));
    setContent('');
    inputRef.current.value = ''
    setTimeout(() => {
      scrollBottom();
    }, 500);
  }
  const initWebSocket = useCallback(() => {
    if(window.WebSocket) {
      ws.current = new WebSocket('ws://192.168.110.1:8181');
      ws.current.onopen = () => {
        console.log('连接开启');
      }
      ws.current.onclose = () => {
        console.log('连接关闭');
      }
      ws.current.onerror = () => {
        console.log('连接错误');
      }
      ws.current.onmessage = (e) => {
        let resData = JSON.parse(e.data);
        if(resData.funName === 'userCount') {
          setUsers(resData.users);
          setList(resData.chat);
        }
        else {
          let newList = [...chatList.current, {userId: resData.userId, content: resData.msg}];
          chatList.current = newList;
          console.log(newList);
          setList(newList);
        }
      }
    }
  }, [])
  useEffect(() => {
    initWebSocket()
  // eslint-disable-next-line
  }, [])
  const btnStyle = useMemo(() => {
    return {
      background: content ? '#409eff' : '',
    }
  }, [content])
  return (
    <div className="chat-container">
      <div className="chat-header">
        聊天人数： {users}
      </div>
      <div className="chat-body" ref={chatBody}>
        {
          handleRenderMsg()
        }
      </div>
      <div className="chat-input">
        <input type="text" ref={inputRef} onChange={debounce(handleChange, 100)}/>
        <div className="btn" style={btnStyle} onClick={handleSendText}>发送</div>
      </div>
    </div>
  )
}

export default Chat;