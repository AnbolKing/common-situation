import React, {
  useState,
  useRef,
} from 'react';
import { Input } from 'antd';
import './style.less';

const DOMHighLight = () => {
  const [htmlText, setHtmlText] = useState([
    {
      text: '用户协议',
      class: 'main-title',
      id: '123',
    },
    {
      text: '一、【协议的范围】',
      class: 'title',
      id: '234',
    },
    {
      text: '1.1本协议是用户（以下可称为“您”）与腾讯之间关于下载、安装、使用、登录本软件，以及使用本服务所订立的协议。',
      class: 'word-title',
      id: '345',
    },
    {
      text: '1.2 本协议被视为《腾讯服务协议》及《腾讯QQ软件许可及服务协议》、《QQ号码规则》的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。本协议内容同时包括腾讯可能不断发布的关于本服务的相 关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。专项规则一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。',
      class: 'word-title',
      id: '456',
    },
    {
      text: '二、【关于本服务】',
      class: 'title',
      id: '567',
    },
    {
      text: '2.1 相关定义',
      class: 'word-title',
      id: '678',
    },
    {
      text: '（1）腾讯企点软件：指由腾讯开发、运营并享有独立知识产权的，专为市场营销、在线客服、销售管理等需求提供内容制作、内容分发、用户数据分析、用户互动等服务的企业服务软件，以下可简称为“企点”。',
      class: 'word-title',
      id: '789',
    },
    {
      text: '（2）单位用户：指按照腾讯指定方式、渠道获得本软件使用权，并对相应的企点帐号（以下可简称为“帐号”，包括单位用户帐号和个人用户帐号）有管理权限的用户。一个企点帐号下仅有一个单位用户帐号。',
      class: 'word-title',
      id: '890',
    },
    {
      text: '（3）个人用户：指经过单位用户授权使用本软件的普通用户。单位用户仅可以将本软件的使用权转授权给属于本单位的工作人员或其他协助运营企点账户的人员进行使用，这里称为个人用户。',
      class: 'word-title',
      id: '2345',
    },
    {
      text: '2.2 本服务内容是指，通过本软件可以对腾讯指定产品进行相关操作（例如在本软件中编辑、整理QQ公众号、微信公众号的文字、图片等消息内容并对外发送）的企业服 务（简称“本服务”）。具体产品以腾讯实际指定的为准。用户在使用本服务进行相关操作时，需要遵守相关产品的服务规则、专项规则等（包括但不限于《QQ公众平台服务协议》、《微信公众平台服务协议》等）。',
      class: 'word-title',
      id: '67890',
    },
  ])
  // eslint-disable-next-line
  const [content, setContent] = useState('');
  const timer = useRef(null);
  const search = useRef('');
  const handleLightDOM = (dom, light) => {
    let domUid = dom.attributes['1'].value;
    setHtmlText(prev => {
      return prev.map(item => {
        if(domUid === item.id) {
          return {
            ...item,
            text: light,
          }
        }
        else {
          return item;
        }
      })
    })
  }
  const handleSearchDom = () => {
    function highlight(value) {
      return `<span class="search-light">${value}</span>`
    }
    let doms = document.getElementsByClassName('need-search');
    Array.from(doms).forEach(dom => {
      let innerHTML = dom.innerText;
      let reg = new RegExp(search.current, 'ig');
      let res = highlight(search.current);
      innerHTML = innerHTML.replace(reg, res)
      handleLightDOM(dom, innerHTML);
    })
  }
  const handleRender = () => {
    return htmlText.map(item => {
      return (
        <p key={item.id} className={'need-search '+item.class} uid={item.id} dangerouslySetInnerHTML={{__html: item.text}}></p>
      )
    })
  }
  const handleSearch = (e) => {
    setContent(e.target.value);
    search.current = e.target.value;
    handleSearchDom();
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
  return (
    <div className='dom-container'>
      <div className="search-input">
        <Input.Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={debounce(handleSearch, 300)}
        />
      </div>
      <div className="dom-content">
          <div className="user-item">
            {
              handleRender()
            }
          </div>
        </div>
      </div>
  )
}

export default DOMHighLight;