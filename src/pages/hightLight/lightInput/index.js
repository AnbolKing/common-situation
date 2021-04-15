import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { Input, Spin, Empty, List } from 'antd';
import { get } from '../../../utils/require';
import './style.less';

const LightInput = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [content, setContent] = useState('');
  const timer = useRef(null);
  const handleSearch = (e) => {
    setLoading(true);
    setContent(e.target.value);
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
  const handleHighLight = (string) => {
    function highlight(value) {
      return `<span style="search-light" >${value}</span>`
    }
    return string.replace(new RegExp(content, 'ig'), content => highlight(content))
  }
  const handleRenderList = () => {
    return (
      <div className="search-list">
        {
          loading ? <Spin style={loadStyle}/> : (data.length===0 ? <Empty style={emptyStyle}/> : (
            <List 
              dataSource={data}
              renderItem={item => {
                return (
                  <List.Item>
                    {handleHighLight(item.name)}
                  </List.Item>
                )
              }}
            />
          ))
        }
      </div>
    )
  }
  const handleFetchData = (content) => {
    get(`https://api.github.com/search/users?q=${content}`)
      .then(res => {
        let userList = res.data.items;
        let users = userList.map(item => {
          return {
            name: item.login,
          }
        })
        setLoading(false);
        setData(users);
      })
  }
  const loadStyle = useMemo(() => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '70px'
    }
  }, [])
  const emptyStyle = useMemo(() => {
    return {
      marginTop: '20px'
    }
  }, [])
  useEffect(() => {
    if(content) {
      handleFetchData(content);
    }
    else {
      setLoading(false);
      setData([]);
    }
  }, [content])
  return (
    <div className="light-container">
      <div className="search-input">
        <Input.Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onChange={debounce(handleSearch, 300)}
        />
      </div>
      {
        handleRenderList()
      }
    </div>
  )
}

export default LightInput;